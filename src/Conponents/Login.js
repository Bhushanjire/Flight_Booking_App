import React, { useState } from "react";
import "../Css/Login.css";
import { NavLink } from "react-router-dom";
import Auth from "../Services/Auth";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Field, reduxForm } from "redux-form";

const validate = values => {
  const errors = {}
  if (!values.emailId) {
    errors.emailId = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailId)) {
    errors.emailId = 'Invalid email address'
  }
  if (!values.emailId) {
    errors.emailId = 'Email is required'
  } else if (values.emailId.length < 2) {
    errors.emailId = 'Minimum be 2 characters or more'
  }
  return errors;
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label className="control-label">{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
      />
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

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

  useEffect(() => {
    console.log("Is valid", isValid);
  });

  const onInputChange = (event) => {
    setLogin({ ...loginData, [event.target.name]: event.target.value });
  };

  const submitHandler = (e) => {
    console.log("submitHandler", e);
    
    e.preventDefault();
    Auth.login(loginData).then((res) => {
      if (res) {
        history.push("/");
        setIsValid({ isValid: false });
      } else {
        setIsValid({ isValid: true });
      }
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
                    {/* <label>Email ID:</label> */}
                    {/* <input
                      type="text"
                      className="form-control"
                      placeholder="Enter email ID"
                      name="emailId"
                      value={emailId}
                      onChange={(e) => onInputChange(e)}
                      required
                    /> */}
                    <Field name="emailId" component={renderField} label="Email ID" type="text"/>
                  </div>
                  <div className="form-group">
                    {/* <label>Password:</label> */}
                    {/* <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      name="password"
                      value={password}
                      onChange={(e) => onInputChange(e)}
                      required
                    /> */}
                    <Field name="password" component={renderField} label="Password" type="password"/>
                  </div>
                  {isValid && (
                    <div className="alert alert-danger" role="alert">
                      Wrong Username/password
                    </div>
                  )}
                  <div className="form-group">
                    <center>
                      <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
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
Login = reduxForm({
  form: 'contact',
  validate,
})(Login);
export default Login;
