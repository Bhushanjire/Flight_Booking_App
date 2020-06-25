import axios from "axios";
const Flight = {
  getList(paramData, callback) {
    return axios
      .get(
        `http://localhost:3003/flightSchedule?fromCityId.name=${paramData.fromCity}&toCityId.name${paramData.toCity}&scheduleDate=${paramData.travelDate}`
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
      .get(`http://localhost:3003/flightSchedule/${id}`)
      .then((responce) => {
        callback(responce);
      })
      .catch((error) => {
        console.log("Error in getFlightScheduleById", error);
      });
  },
};

export default Flight;
