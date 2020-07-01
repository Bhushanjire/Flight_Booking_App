import React, { useState } from "react";
import "../Css/Login.css";
import { Link } from "react-router-dom";
import Auth from "../Services/Auth";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Header from "../Components/Header";
import Loading from "../Components/Loding";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../Redux/Actions";

let Login = (props) => {
  const { handleSubmit, pristine, submitting } = props;

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
  });

  useEffect(() => {}, [loginData.emailId, loginData.password]);

  const onInputChange = (event) => {
    setLogin({ ...loginData, [event.target.name]: event.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorMessages();
    if (
      loginData &&
      loginData.emailId &&
      loginData.password &&
      !error.isValidEmail
    ) {
      Auth.login(loginData)
        .then((res) => {
          if (res.data.length > 0) {
            localStorage.setItem("react-user", JSON.stringify(res.data[0]));
            dispatch(loginUser(res.data[0]));
            localStorage.setItem("react-token", "token12345");
            setIsValid({ isValid: false });
            history.push("/");
            // window.location = "/";
          } else {
            setIsValid({ isValid: true });
          }
        })
        .catch((error) => {
          console.log("Error in login", error);
        });
    } else {
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

  return (
    <React.Fragment>
      {/* <MyContext.Provider value={loginData}>
        <Header />
      </MyContext.Provider> */}
      <div className="row">
        <div className="col-md-12">
          <div className="login-block">
            <div className="card">
              <div className="card-body">
                <center>
                  <h3>Login</h3>
                  <Loading isLoading={true} />
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
                  {isValid && (
                    <div className="alert alert-danger" role="alert">
                      Wrong Username/password
                    </div>
                  )}
                  <div className="form-group">
                    <center>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={pristine || submitting}
                      >
                        Login
                      </button>
                      &nbsp;&nbsp;
                      <Link exact to="/" className="ml-2">
                        <button type="button" className="btn btn-danger">
                          Cancel
                        </button>
                      </Link>
                    </center>
                  </div>
                </form>
                <div>
                  <center>
                    <Link exact to="/sign-up" className="ml-2">
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
