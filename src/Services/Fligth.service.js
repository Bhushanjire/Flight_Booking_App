import axios from "axios";
const Flight = {
  getList(paramData, callback) {
    return axios
      .get(
        `http://localhost:3003/FlightSchedule?fromCityId.name=${paramData.fromCity}&toCityId.name=${paramData.toCity}&scheduleDate=${paramData.travelDate}`
      )
      .then((responce) => {
        console.log("Schedule List");
        callback(responce);
      })
      .catch((error) => {
        console.log("Error in flight schedule list", error);
      });
  },
  getCityList(callback) {
    return axios
      .get(`http://localhost:3003/City`)
      .then((responce) => {
        callback(responce);
      })
      .catch((error) => {
        console.log("Error in city list", error);
      });
  },
  getFlightScheduleById(id, callback) {
    return axios
      .get(`http://localhost:3003/FlightSchedule/${id}`)
      .then((responce) => {
        callback(responce);
      })
      .catch((error) => {
        console.log("Error in getFlightScheduleById", error);
      });
  },
  updateFlightSchedule(id, data, callback) {
    return axios
      .put(`http://localhost:3003/FlightSchedule/${id}`, data)
      .then((responce) => {
        callback(responce);
      })
      .catch((error) => {
        console.log("Error in updateFlightSchedule", error);
        callback(error);
      });
  },
  addNewBooking(data, callback) {
    return axios
      .post(`http://localhost:3003/FlightBooking`, data)
      .then((responce) => {
        callback(responce);
      })
      .catch((error) => {
        callback(error);
      });
  },
};

export default Flight;
