import React, { Component } from "react";
import "../Css/Header.css";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./Login";
import SignUp from "./SignUp";
import App from "../App";
import {
  Link,
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "../Services/Auth";

const Header = (props) => {
  var LoginUser =null;
  if(Auth.authenticated()){

  var { firstName, lastName,id } = JSON.parse(
    localStorage.getItem("react-user")
  );

  LoginUser = "Welcome ," + firstName  + " " + lastName;
}
  return (
    <React.Fragment>
        <div className="header pt-4 mb-5">
          <div className="row">
            <div className="col-md-4">
              <span className="ml-1">
                {/* {Auth.authenticated() && ( */}
                  <Link exact to="/" className="mr-2">
                    Home
                  </Link>
                {/* )} */}
              </span>
              &nbsp;&nbsp;
              <span>
                {Auth.authenticated() && (
                  <Link exact to={`/my-booking/${id}`} className="mr-2">
                    My Bookings
                  </Link>
                )}
              </span>
            </div>
            <div className="col-md-4 text-center">
              <h3>Book Your Flight</h3>
            </div>
            <div className="col-md-4 text-right">
              <div className="pr-5">
                <span className="mr-3">
                  {Auth.authenticated() && LoginUser}
                </span>
                {!Auth.authenticated() && (
                  <NavLink exact to="/login" className="mr-2">
                    Login
                  </NavLink>
                )}
                {!Auth.authenticated() && <span>/</span>}

                {!Auth.authenticated() && (
                  <NavLink exact to="/sign-up" className="ml-2">
                    Sign Up
                  </NavLink>
                )}

                {Auth.authenticated() && (
                  <a href="#" type="button" onClick={Auth.logout}>
                    Logout
                  </a>
                  // <NavLink exact to="/sign-up" className="ml-2">logout</NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
    </React.Fragment>
  );
};

export default Header;
