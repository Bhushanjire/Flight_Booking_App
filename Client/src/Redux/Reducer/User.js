import { ADD_USER, LOGIN_USER, GET_MY_BOOKING } from "../../Constants";
const userReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
      break;
    case LOGIN_USER:
      return [action.payload];
      break;
    case "LOGOUT":
      return state;
      break;
    case GET_MY_BOOKING:
      return [...state, action.payload];
      break;
    default:
      return state;
      break;
  }
};
export default userReducer;
