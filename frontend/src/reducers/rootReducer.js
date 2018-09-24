import { combineReducers } from "redux";

import login from "./login";
import companies from "./companies";
import users from "./users";

export default combineReducers({
  login,
  companies,
  users
});
