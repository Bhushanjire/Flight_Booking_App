import React, { Component } from "react";
import "../includes/header.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header pt-4 mb-5">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 text-center">
          <h3>Book Your Flight</h3>
        </div>
        <div className="col-md-4 text-right">
          <div className="pr-5">
            <span className="mr-3">Welcome ,Bhushan Jire</span>
            <NavLink  exact to="/login" className='mr-2'>
              Login
            </NavLink>/
            <NavLink  exact to="/sign-in" className='ml-2'>
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
