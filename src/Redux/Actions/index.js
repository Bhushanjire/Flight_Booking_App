import {
  ADD_USER,
  LOGIN_USER,
  FLIGHT_SEARCH,
  FLIGHT_SCHEDULE_LIST,
  GET_MY_BOOKING,
  LOADING,
  FILTER,
} from "../../Constants/index";
import axios from "axios";

export const addUser = (data) => {
  return axios
    .post(`http://localhost:3003/users`, data)
    .then((result) => {
      return {
        type: ADD_USER,
        payload: result.data,
      };
    })
    .catch((error) => {
      return {
        type: ADD_USER,
        payload: error,
      };
    });
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

export const getMyBookings = (id) => {
  axios
    .get(`http://localhost:3003/FlightBooking?userId=${id}`)
    .then((result) => {
      return {
        type: GET_MY_BOOKING,
        payload: result.data,
      };
    })
    .catch((error) => {
      return {
        type: GET_MY_BOOKING,
        payload: error,
      };
    });
};

export const loading = (value) => {
  return {
    type: LOADING,
    payload: value,
  };
};

export const filter = (data) => {
  console.log("Value in action", data);

  return (dispatch) => {
    return dispatch({
      type: FILTER,
      payload: data,
    });
  };
};
