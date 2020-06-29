import axios from "axios";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status == 401) {
      //   Auth.logout();
    }
  }
);

const Auth = {
  authenticated() {
    return !!localStorage.getItem("react-token");
  },
  login({ emailId, password }) {
    return axios
      .get(
        `http://localhost:3003/users?emailId=${emailId}&password=${password}`)
  },
  logout() {
    localStorage.removeItem("react-token");
    window.location = "/";
  },
};

export default Auth;
