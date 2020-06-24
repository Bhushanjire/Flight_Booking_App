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
    return axios.get(`http://localhost:3003/users/`).then((res) => {
      if (res.status == 200) {
        var isValid = false;
        res.data.forEach((element) => {
          if (element.emailId == emailId && element.password == password) {
            isValid = true;
            localStorage.setItem("react-token", "token12345");
          }
        });
      }
      return isValid;
    });
  },
  logout() {
    localStorage.removeItem("react-token");
    window.location = "/";
  },
};

export default Auth;
