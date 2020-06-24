import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Flights from "./Flights";
// import "./Css/SelectSearch.css";
// import SelectSearch from "react-select-search";

const Main = () => {
  const [flight, setFlight] = useState({
    fromCity: "",
    toCity: "",
    travelDate: "",
  });

  // const options = [
  //   { name: "Swedish", value: "sv" },
  //   { name: "English", value: "en" },
  // ];

  let flightData = {};

  const onInputChange = (event) => {
    setFlight({ ...flight, [event.target.name]: event.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitHandler", flight);
    flightData = flight;
  };

  const { fromCity, toCity, travelDate } = flight;
  return (
    <div className="container">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="From"
              id="fromCity"
              name="fromCity"
              onChange={(e) => onInputChange(e)}
              value={fromCity}
            />
            {/* <SelectSearch
              options={options}
              search={true}
              name="fromCity"
              placeholder="Choose city"
              value={fromCity}
            /> */}
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="To"
              id="toCity"
              name="toCity"
              onChange={(e) => onInputChange(e)}
              value={toCity}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              placeholder="Date"
              id="travelDate"
              name="travelDate"
              onChange={(e) => onInputChange(e)}
              value={travelDate}
            />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>
      <div className="row mt-3">
        <div className="col-md-12">
          <Flights flightData={flightData} />
        </div>
      </div>
    </div>
  );
};

export default Main;
