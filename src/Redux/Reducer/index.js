import { combineReducers } from "redux";
import userReducer from "../Reducer/User";
import flightReducer from "../Reducer/Flight";
import loadingReducer from "../Reducer/Loading";
import filterReducer from '../Reducer/Filter';

const allReducer = combineReducers({
  userReducer,
  flightReducer,
  loadingReducer,
  filterReducer
});

export default allReducer;
