import React, { useState } from "react";
import "../Css/Login.css";
import { Link } from "react-router-dom";
import Auth from "../Services/Auth";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, alert } from "../Redux/Actions";
import { loading, popup } from "../Redux/Actions";
import { login } from "../Services/PreloginApi";
import ForgotPassword from '../Components/ForgotPassword';
import ReduxForm from './ReduxForm';

let Login = (props) => {
  const { pristine, submitting } = props;

  let history = useHistory();

  const dispatch = useDispatch();

  if (Auth.authenticated()) {
    history.push("/");
    // window.location = "/";
  }

  const [loginData, setLogin] = useState({
    emailId: "",
    password: "",
  });
  const { emailId, password } = loginData;

  const [isValid, setIsValid] = useState(null);

  const [error, setError] = useState({
    emailRequired: false,
    passwordRequired: false,
    isValidEmail: false,
    isOpen: false
  });

  useEffect(() => { }, [loginData.emailId, loginData.password]);

  const onInputChange = (event) => {
    setLogin({ ...loginData, [event.target.name]: event.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    setErrorMessages();
    if (
      loginData &&
      loginData.emailId &&
      loginData.password &&
      !error.isValidEmail
    ) {
      login(loginData)
        .then((loginResponce) => {
          dispatch(loading(false));
          let apiResponce = loginResponce.data;
          if (apiResponce.isSuccess) {
            localStorage.setItem(
              "react-user",
              JSON.stringify(apiResponce.data)
            );
            dispatch(loginUser(apiResponce.data));
            dispatch(alert({
              status: true,
              severity: "success",
              message: 'Login successfull...'
            }))
            setIsValid({ isValid: false });
            history.push("/");
          } else {
            dispatch(loading(false));
            setIsValid({ isValid: true });
          }
        })
        .catch((error) => {
          dispatch(loading(false));
          setIsValid({ isValid: true });
          dispatch(alert({
            status: true,
            severity: "error",
            message: 'Wrong username/password'
          }))
          console.log("Error in login", error);
        });

      // Auth.login(loginData)
      //   .then((res) => {
      //     dispatch(loading(false));
      //     if (res.data.length > 0) {
      //       localStorage.setItem("react-user", JSON.stringify(res.data[0]));
      //       dispatch(loginUser(res.data[0]));
      //       setIsValid({ isValid: false });
      //       history.push("/");
      //       // window.location = "/";
      //     } else {
      //       setIsValid({ isValid: true });
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("Error in login", error);
      //   });
    } else {
      dispatch(loading(false));
      console.log("Record not found");
    }
  };

  const setErrorMessages = () => {
    setError({
      emailRequired: loginData.emailId ? false : true,
      passwordRequired: loginData.password ? false : true,
      isValidEmail:
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginData.emailId) &&
        loginData.emailId,
    });
  };

  const openPopup = () => {
    let popupData = {
      forgotPassword: true
    }
    dispatch(popup(popupData));

  }

  return (
    <React.Fragment>
      <ForgotPassword />
      {/* <ReduxForm/> */}
      <div className="row">
        <div className="col-md-12">
          <div className="login-block">
            <div className="card">
              <div className="card-body">
                <center>
                  <h3>Sign In</h3>
                </center>
                <form onSubmit={(e) => submitHandler(e)}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter email ID"
                      name="emailId"
                      value={emailId}
                      onChange={(e) => onInputChange(e)}
                    />
                    {error.emailRequired && (
                      <div className="text-danger">Email is required</div>
                    )}
                    {error.isValidEmail && (
                      <div className="text-danger">Email is not valid</div>
                    )}
                    {/* <Field
                      name="emailId"
                      component={renderField}
                      label="Email ID"
                      type="text"
                    /> */}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      name="password"
                      value={password}
                      onChange={(e) => onInputChange(e)}
                    />
                    {error.passwordRequired && (
                      <div className="text-danger">Password is required</div>
                    )}
                    {/* <Field
                      name="password"
                      component={renderField}
                      label="Password"
                      type="password"
                    /> */}
                  </div>
                  {/* {isValid && (
                    <div className="alert alert-danger" role="alert">
                      Wrong Username/password
                    </div>
                  )} */}
                  <div className="form-group">
                    <center>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={pristine || submitting}
                      >
                        Sign In
                      </button>
                      &nbsp;&nbsp;
                      {/* <Link  to="/forgot-password" className="ml-2"> */}
                      <button type="button" onClick={openPopup} className="btn btn-danger">
                        Forgot Password
                         </button>
                      {/* </Link> */}
                    </center>
                  </div>
                </form>
                <div>
                  <center>
                    <Link to="/sign-up" className="ml-2">
                      Sign Up
                    </Link>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
// Login = reduxForm({
//   form: "login",
//   validate,
// })(Login);
export default Login;
