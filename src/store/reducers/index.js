import { combineReducers } from "redux";

import home from "./home";
import comments from "./comments";
import tictactoe from "./tictactoe";

export default combineReducers({
  home,
  comments,
  tictactoe
});
