import path from "path";
import fs from "fs";

import React from "react";
import ReactDOMServer from "react-dom/server";
import Helmet from "react-helmet";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import { Frontload, frontloadServerRender } from "react-frontload";
import serialize from "serialize-javascript";

// import our main App component
import App from "../src/App";
// import the manifest generated with the create-react-app build
import manifest from "../build/asset-manifest.json";

const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
  data = data.replace("<html>", `<html ${html}>`);
  data = data.replace(/<title>.*?<\/title>/g, title);
  data = data.replace("</head>", `${meta}</head>`);
  data = data.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div><script>window.__PRELOADED_STATE__=${state}</script>`
  );
  data = data.replace("</body>", scripts.join("") + "</body>");

  return data;
};

export default store => (req, res, next) => {
  // get the html file created with the create-react-app build
  const filePath = path.resolve(__dirname, "../build/index.html");

  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("err", err);
      return res.status(404).end();
    }

    const context = {};
    const modules = [];

    frontloadServerRender(() =>
      // render the app as a string
      ReactDOMServer.renderToString(
        <Loadable.Capture report={m => modules.push(m)}>
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <Frontload isServer={true}>
                <App />
              </Frontload>
            </StaticRouter>
          </Provider>
        </Loadable.Capture>
      )
    ).then(routeMarkup => {
      if (context.url) {
        res.writeHead(302, {
          Location: context.url
        });

        res.end();
      } else {
        // function to extract js assets from the manifest
        const extractAssets = (assets, chunks) =>
          Object.keys(assets)
            .filter(asset => chunks.indexOf(asset.replace(".js", "")) > -1)
            .map(k => assets[k]);

        // map required assets to script tags
        const extraChunks = extractAssets(manifest, modules).map(
          c => `<script type="text/javascript" src="${c}"></script>`
        );

        const helmet = Helmet.renderStatic();

        const html = injectHTML(htmlData, {
          html: helmet.htmlAttributes.toString(),
          title: helmet.title.toString(),
          meta: helmet.meta.toString(),
          body: routeMarkup,
          scripts: extraChunks,
          state: serialize(store.getState(), { isJSON: true })
        });

        // now inject the rendered app into our html and send it to the client
        res.send(html);
      }
    });
  });
};
