import {
  ADD_USER,
  LOGIN_USER,
  FLIGHT_SEARCH,
  FLIGHT_SCHEDULE_LIST,
} from "../../Constants/index";

export const addUser = (data) => {
  return {
    type: ADD_USER,
    payload: data,
  };
};

export const loginUser = (data) => {
  return {
    type: LOGIN_USER,
    payload: data,
  };
};

export const flightSearch = (data) => {
  return {
    type: FLIGHT_SEARCH,
    payload: data,
  };
};

export const getFlightScheduleList = (data) => {
  return {
    type: FLIGHT_SCHEDULE_LIST,
    payload: data,
  };
};
