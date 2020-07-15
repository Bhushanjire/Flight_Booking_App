import api from "../Services/Api";

export const login = (data) => {
  return api.post("/user/login", data)
};
