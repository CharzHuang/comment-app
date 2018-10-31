import serverRenderer from "./renderer";
import configureStore from "../src/store/configureStore";
import { addComment } from "../src/store/reducers/comments";

const serverSideComment = {
  userName: "Jason",
  content: "<h1>This comment is from server side.</h1>"
};

export default (req, res, next) => {
  const { store } = configureStore(req.url);

  //make some fake data
  store.dispatch(addComment(serverSideComment));

  serverRenderer(store)(req, res, next);
};
