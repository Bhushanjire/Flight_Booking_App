import React, { useState } from "react";
import "../Css/Login.css";
import { NavLink } from "react-router-dom";
import Auth from "../Services/Auth";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Field, reduxForm } from "redux-form";

let Login = (props) => {
  const { handleSubmit, pristine, submitting } = props;

  let history = useHistory();

  if (Auth.authenticated()) {
    window.location = "/";
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

  useEffect(() => {
    // console.log("loginData.emailId", loginData.emailId);
    // console.log("loginData.password", loginData.password);
    // setErrorMessages()
    if (loginData.emailId) {
      console.log("if");
    } else {
      console.log("else");
    }
  }, [loginData.emailId, loginData.password]);

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
            localStorage.setItem("react-token", "token12345");
            history.push("/");
            setIsValid({ isValid: false });
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
      <div className="row">
        <div className="col-md-12">
          <div className="login-block">
            <div className="card">
              <div className="card-body">
                <center>
                  <h3>Login</h3>
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
                      <NavLink exact to="/" className="ml-2">
                        <button type="button" className="btn btn-danger">
                          Cancel
                        </button>
                      </NavLink>
                    </center>
                  </div>
                </form>
                <div>
                  <center>
                    <NavLink exact to="/sign-up" className="ml-2">
                      Sign Up
                    </NavLink>
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
