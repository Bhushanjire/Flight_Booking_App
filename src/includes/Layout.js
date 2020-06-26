import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

import Header from "../includes/header";
import Main from "../Conponents/Main";
import Filter from "../Conponents/Filter";

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            {/* <Header /> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <Filter />
          </div>
          <div className="col-md-10 text-left">
            <Main />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
