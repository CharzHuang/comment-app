import { createStore, compose, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import ReduxThunk from "redux-thunk";
import { createBrowserHistory, createMemoryHistory } from "history";
import commentsReducer from "./reducers/comments";

export const isServer = !(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export default (url = "/") => {
  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url]
      })
    : createBrowserHistory();

  const enhancers = [];
  if (process.env.NODE_ENV === "development" && !isServer) {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
  }

  const middlewares = [ReduxThunk, routerMiddleware(history)];
  const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
  );

  const initialState = !isServer ? window.__PRELOADED_STATE__ : {};

  if (!isServer) delete window.__PRELOADED_STATE__;

  const store = createStore(
    connectRouter(history)(commentsReducer),
    initialState,
    composedEnhancers
  );

  return {
    store,
    history
  };
};
