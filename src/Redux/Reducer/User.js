import { ADD_USER, LOGIN_USER } from "../../Constants";
const userReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      console.log("In user reducer", action);
      return [...state, action.payload];
      break;
    case LOGIN_USER:
      return [action.payload];
      break;
    case "LOGOUT":
      return state;
      break;
    default:
      return state;
      break;
  }
};
export default userReducer;
