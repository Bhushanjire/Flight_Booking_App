import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignIn = () => {
    let history = useHistory();

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

  const submitHandler =  (e) => {
    console.log("User", user);
    e.preventDefault();
    axios.post("http://localhost:3003/users", user).then((result)=>{
        history.push("/");
    }).catch(error=>{
        console.log('Error');
        
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="row">
          <div className="col-md-12">
            <div className="login-block">
              <div class="card">
                <div class="card-body">
                  <center>
                    <h3>Sign In</h3>
                  </center>
                  <div class="form-group">
                    {/* <label>First Name:</label> */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter first name"
                      name="firstName"
                      onChange={(e) => onInputChange(e)}
                      value={firstName}
                    />
                  </div>
                  <div class="form-group">
                    {/* <label>Last Name:</label> */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter last name"
                      name="lastName"
                      onChange={(e) => onInputChange(e)}
                      value={lastName}
                    />
                  </div>
                  <div class="form-group">
                    {/* <label>Email ID:</label> */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your email ID"
                      name="emailId"
                      onChange={(e) => onInputChange(e)}
                      value={emailId}
                    />
                  </div>
                  <div class="form-group">
                    {/* <label>Mobile No:</label> */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter mobile No."
                      name="mobileNo"
                      onChange={(e) => onInputChange(e)}
                      value={mobileNo}
                    />
                  </div>

                  <div class="form-group">
                    {/* <label>Gender:</label> */}

                    <select
                      className="form-control"
                      name="gender"
                      onChange={(e) => onInputChange(e)}
                      value={gender}
                    >
                      <option value="">--Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    {/* <label>Password:</label> */}
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      name="password"
                      onChange={(e) => onInputChange(e)}
                      value={password}
                    />
                  </div>
                  <div className="form-group">
                    <center>
                      <button type="submit" className="btn btn-primary">
                        Sign In
                      </button>
                      &nbsp;&nbsp;
                      <NavLink exact to="/" className="ml-2">
                        <button type="button" className="btn btn-danger">
                          Cancel
                        </button>
                      </NavLink>
                    </center>
                  </div>
                  <div>
                    <center>
                      <NavLink exact to="/login" className="ml-2">
                        Login
                      </NavLink>
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
