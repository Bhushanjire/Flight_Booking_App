import { ADD_USER,LOGIN_USER } from "../../Constants/index";

export const addUser = (data) => {
  return {
    type: ADD_USER,
    payload : data
  };
};

export const loginUser =(data)=>{
    return {
        type : LOGIN_USER,
        payload : data
    }
}
