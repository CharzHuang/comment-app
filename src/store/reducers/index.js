import { combineReducers } from "redux";

import home from "./home";
import comments from "./comments";

export default combineReducers({
  home,
  comments
});
