import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Auth from "../Services/Auth";
import { useSelector, useDispatch } from "react-redux";
import { addUser, loading } from "../Redux/Actions/";

const SignIn = () => {
  const users = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const userRef = useRef({});

  let history = useHistory();
  if (Auth.authenticated()) {
    history.push("/");
  }

  const [validation, setValidation] = useState({
    isSuccess: false,
    isEmailExist: false,
  });

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    mobileNo: "",
    gender: "",
    password: "",
  });

  const { firstName, lastName, emailId, mobileNo, gender, password } = user;

  const onInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(addUser(user));
    // return;
    dispatch(loading(true));
    Auth.checkEmailExist(emailId)
      .then((result) => {
        if (result.data.length) {
          setValidation({ ...validation, isEmailExist: true });
          dispatch(loading(false));
        } else {
          setValidation({ ...validation, isEmailExist: false });
          Auth.signUp(user)
            .then((result) => {
              dispatch(loading(false));
              if (result) {
                setUser({
                  firstName: "",
                  lastName: "",
                  emailId: "",
                  mobileNo: "",
                  gender: "",
                  password: "",
                });
                setValidation({ ...validation, isSuccess: true });
                setTimeout(() => {
                  history.push("/login");
                }, 2000);
              }
            })
            .catch((error) => {
              console.log("Error in create user", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error in checkEmailExist");
      });
  };

  return (
    <React.Fragment>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="row">
          <div className="col-md-12">
            <div className="login-block">
              {validation.isSuccess && (
                <div className="alert alert-success" role="alert">
                  Signup successfully...Please Login
                </div>
              )}
              <div className="card">
                <div className="card-body">
                  <center>
                    <h3>Sign Up</h3>
                  </center>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter first name"
                      name="firstName"
                      onChange={(e) => onInputChange(e)}
                      value={firstName}
                      required
                      ref={userRef}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter last name"
                      name="lastName"
                      onChange={(e) => onInputChange(e)}
                      value={lastName}
                      required
                      ref={userRef}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email ID"
                      name="emailId"
                      onChange={(e) => onInputChange(e)}
                      value={emailId}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter mobile No."
                      name="mobileNo"
                      onChange={(e) => onInputChange(e)}
                      value={mobileNo}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="gender"
                      onChange={(e) => onInputChange(e)}
                      value={gender}
                      required
                    >
                      <option value="">--Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      name="password"
                      onChange={(e) => onInputChange(e)}
                      value={password}
                      required
                    />
                  </div>
                  {validation.isEmailExist && (
                    <div className="alert alert-danger" role="alert">
                      Email ID already exist
                    </div>
                  )}
                  <div className="form-group">
                    <center>
                      <button type="submit" className="btn btn-primary">
                        Sign Up
                      </button>
                      &nbsp;&nbsp;
                      <Link exact to="/" className="ml-2">
                        <button type="button" className="btn btn-danger">
                          Cancel
                        </button>
                      </Link>
                    </center>
                  </div>
                  <div>
                    <center>
                      <Link exact to="/login" className="ml-2">
                        Login
                      </Link>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SignIn;
