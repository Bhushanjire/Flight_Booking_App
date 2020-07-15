import httpMethod from "./httpMethod";

export const login = (data) => {
  return httpMethod.POST("/user/login", data);
};

export const signUp = (data) => {
  return httpMethod.POST("/user/signup", data)
};
