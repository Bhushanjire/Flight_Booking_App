import React, { Component } from "react";
import "../includes/header.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link, NavLink } from "react-router-dom";
import Auth from "../Services/Auth";

const Header = () => {
  const { firstName, lastName } = JSON.parse(
    localStorage.getItem("react-user")
  );

  let LoginUser = "Welcome ," + firstName + " " + lastName;

  return (
    <div className="header pt-4 mb-5">
      <div className="row">
        <div className="col-md-4">
          <span className="ml-1">
            {
              <NavLink exact to="/" className="mr-2">
                Home
              </NavLink>
            }
            {/* Home */}
          </span>
          &nbsp;&nbsp;
          <span>
            {
              <NavLink exact to="/my-booking" className="mr-2">
                My Bookings
              </NavLink>
            }
          </span>
        </div>
        <div className="col-md-4 text-center">
          <h3>Book Your Flight</h3>
        </div>
        <div className="col-md-4 text-right">
          <div className="pr-5">
            <span className="mr-3">{Auth.authenticated() && LoginUser}</span>
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
  );
};

export default Header;
