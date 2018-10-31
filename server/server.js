import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";
import Loadable from "react-loadable";
import cookieParser from "cookie-parser";

import indexController from "./controllers";

const PORT = process.env.PORT || 3000;

// initialize the application and create the routes
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.Router().get("^/$", indexController));
app.use(express.static(path.resolve(__dirname, "../build"), { maxAge: "30d" }));
app.use(indexController);

// start the app
Loadable.preloadAll().then(() => {
  app.listen(PORT, error => {
    if (error) {
      return console.log("something bad happened", error);
    }

    console.log(`listening on ${PORT}...`);
  });
});
