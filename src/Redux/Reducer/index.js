import { combineReducers } from "redux";
import userReducer from "../Reducer/User";
import flightReducer from "../Reducer/Flight";

const allReducer = combineReducers({
  userReducer,
  flightReducer,
});

export default allReducer;
