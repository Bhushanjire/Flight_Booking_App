import httpMethod from "./httpMethod";

export const getCities = () => {
  return httpMethod.GET("/list-city");
};
export const getSeacrhFlight = (data) => {
  return httpMethod.POST("/flightSchedule/search", data);
};
export const getFlightSchedulById = (data) => {
  return httpMethod.POST("/flightSchedule/get-by-id", data);
};
export const createBooking = (data) => {
  return httpMethod.POST("/flightBooking/create", data);
};
export const getUserBooking = (data) => {
  return httpMethod.POST("/flightBooking/get-by-userId", data);
};
export const getBookingById = (data)=>{
  return httpMethod.POST("/flightBooking/get-by-id", data);
}

export const updateBooking = (data)=>{
  return httpMethod.POST("/flightBooking/update", data);
}

export const getUserData =(data)=>{
  return httpMethod.POST("/user/get-by-id", data);
}

