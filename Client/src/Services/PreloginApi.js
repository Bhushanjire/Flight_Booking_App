import httpMethod from "./httpMethod";

export const login = (data) => {
  return httpMethod.POST("/user/login", data);
};

export const signUp = (data) => {
  return httpMethod.POST("/user/signup", data)
};

export const forgotPassword = (data)=>{
  return httpMethod.POST("/user/forgot-password", data);
}
export const resetPassword = (data)=>{
  return httpMethod.POST("/user/reset-password", data);
}
