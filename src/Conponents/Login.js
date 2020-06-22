import React from "react";
import "../Css/Login.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <div className="login-block">
            <div class="card">
              <div class="card-body">
                <center>
                  <h3>Login</h3>
                </center>
                <div class="form-group">
                  {/* <label>Email ID:</label> */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email ID"
                  />
                </div>
                <div className="form-group">
                  {/* <label>Password:</label> */}
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                </div>
                <div className="form-group">
                  <center>
                    <button type="submit" className="btn btn-primary">
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
                <div>
                  <center>
                    <NavLink exact to="/sign-in" className="ml-2">
                      Sign In
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

export default Login;
