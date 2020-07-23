import { combineReducers } from "redux";
import userReducer from "../Reducer/User";
import flightReducer from "../Reducer/Flight";
import loadingReducer from "../Reducer/Loading";
import filterReducer from '../Reducer/Filter';
import popupReducer from '../Reducer/Popup';
import alertReducer from '../Reducer/Alert';

const allReducer = combineReducers({
  userReducer,
  flightReducer,
  loadingReducer,
  filterReducer,
  popupReducer,
  alertReducer
});

export default allReducer;
