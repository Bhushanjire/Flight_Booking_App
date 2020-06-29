import axios from "axios";
const Flight = {
  getList(paramData) {
    return axios.get(
      `http://localhost:3003/FlightSchedule?fromCityId.name=${paramData.fromCity}&toCityId.name=${paramData.toCity}&scheduleDate=${paramData.travelDate}`
    );
  },
  getCityList() {
    return axios.get("http://localhost:3003/City");
  },
  getFlightScheduleById(id) {
    return axios.get(`http://localhost:3003/FlightSchedule/${id}`);
  },
  updateFlightSchedule(id, data) {
    return axios.put(`http://localhost:3003/FlightSchedule/${id}`, data);
  },
  addNewBooking(data) {
    return axios.post(`http://localhost:3003/FlightBooking`, data);
  },
  getMyBookings(id){
    return axios.get(`http://localhost:3003/FlightBooking?userId=${id}`);
  }
};

export default Flight;
