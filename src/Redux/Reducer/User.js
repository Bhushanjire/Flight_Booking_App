import { ADD_USER,LOGIN_USER } from "../../Constants";
const userReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      console.log('In user reducer',action);
      return [...state,  action.payload];
    case LOGIN_USER:
      return [action.payload];
    case "LOGOUT":
      return state;
    default:
      return state;
  }
};
export default userReducer;
