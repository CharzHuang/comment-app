import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import { Frontload } from "react-frontload";
import { ConnectedRouter } from "connected-react-router";
import configureStore from "./store/configureStore";

import "./index.css";
import App from "./App";

import * as serviceWorker from "./serviceWorker";

const { store, history } = configureStore();

const AppBundle = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Frontload noServerRender={true}>
        <App />
      </Frontload>
    </ConnectedRouter>
  </Provider>
);

const root = document.getElementById("root");

if (root.hasChildNodes()) {
  Loadable.preloadReady().then(() => ReactDOM.hydrate(AppBundle, root));
} else {
  ReactDOM.render(AppBundle, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
