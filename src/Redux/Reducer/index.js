import { combineReducers } from "redux";
import userReducer from "../Reducer/User";
import flightReducer from "../Reducer/Flight";
import loadingReducer from "../Reducer/Loading";

const allReducer = combineReducers({
  userReducer,
  flightReducer,
  loadingReducer,
});

export default allReducer;
