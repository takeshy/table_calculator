import { combineReducers } from "redux";
import formulas from "./formulas";
import auth from "./auth";

export default combineReducers({
  formulas,
  auth
});
