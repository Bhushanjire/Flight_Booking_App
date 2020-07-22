import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(function (config) {
  if (localStorage.getItem("react-user")) {
    const logindata = JSON.parse(localStorage.getItem("react-user"));
    config.headers.authorization = "Bearer "+logindata.token;
    return config;
  } else {
    config.headers.authorization = "";
    return config;
  }
});

api.interceptors.response.use(function (response) {
  if (response.data.statusCode === 401) {
    alert('Token Expired');
    // message.error(response.data.message);
    localStorage.removeItem("react-user");

    window.location = "/";
  }
  return response;
});

export default api;







