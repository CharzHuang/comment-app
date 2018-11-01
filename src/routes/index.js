import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

const HomePage = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ "../containers/HomePage"),
  loading: () => null,
  modules: ["home"]
});

const CommentPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "comments" */ "../containers/CommentPage"),
  loading: () => null,
  modules: ["comments"]
});

export default () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/comments" component={CommentPage} />
  </Switch>
);
