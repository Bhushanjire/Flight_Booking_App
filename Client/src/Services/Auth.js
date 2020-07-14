import axios from "axios";
import {useHistory} from 'react-router-dom';

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
    return axios.get(
      `http://localhost:3003/users?emailId=${emailId}&password=${password}`
    );
  },
  logout() {
    
  },
  checkEmailExist(emailId){
    return axios
      .get(`http://localhost:3003/users?emailId=${emailId}`)
  },
  signUp(user) {
    return axios.post(`http://localhost:3003/users`,user);
  },
};

export default Auth;
