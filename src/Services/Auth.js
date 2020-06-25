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
        `http://localhost:3003/users?emailId=${emailId}&password=${password}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          if (res.status == 200) {
            console.log("User Result", res.data);
            localStorage.setItem("react-user",  JSON.stringify(res.data[0]));
            localStorage.setItem("react-token", "token12345");
            return true;
          } else {
            return false;
          }
        }
      });
  },
  logout() {
    localStorage.removeItem("react-token");
    window.location = "/";
  },
};

export default Auth;
