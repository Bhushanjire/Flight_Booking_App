import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../Components/Header";
import Main from "./Main";
import Filter from "./Filter";

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
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
