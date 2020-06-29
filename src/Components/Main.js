import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Flights from "./Flights";
import Flight from "../Services/Fligth.service";

const Main = () => {
  const [flight, setFlight] = useState({
    fromCity: "",
    toCity: "",
    travelDate: "",
    noOfPerson: "",
  });

  const [flightList, setFlightList] = useState([]);
  const [cities, setCities] = useState([]);
  const [validation, setValidation] = useState({
    isFound: false,
  });

  const onInputChange = (event) => {
    console.log(event.target.name + " " + event.target.value);

    setFlight({ ...flight, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    // flightData = flight;
    loadCities();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    loadData();
  };

  const loadData = () => {
    setValidation({
      isFound: true,
    });
    Flight.getList(flight)
      .then((result) => {
        setFlightList(result.data);
      })
      .catch((error) => {
        console.log("Error in getList", error);
      });
  };

  const loadCities = () => {
    Flight.getCityList()
      .then((result) => {
        setCities(result.data);
      })
      .catch((error) => {
        console.log("Error in get city list", error);
      });

    // setCities(cityResult.data);
  };

  const { fromCity, toCity, travelDate, noOfPerson, isFound } = flight;
  return (
    <div className="container">
      {/* {flightList} */}
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="row">
          <div className="col-md-3">
            {/* <input
              type="text"
              className="form-control"
              placeholder="From"
              id="fromCity"
              name="fromCity"
              onChange={(e) => onInputChange(e)}
              value={fromCity}
            /> */}
            <select
              className="form-control"
              placeholder="From"
              id="fromCity"
              name="fromCity"
              onChange={(e) => onInputChange(e)}
              required
            >
              <option value="">--Source--</option>
              {cities.map((row) => (
                <option key={row.id} value={row.name}>
                  {row.name}
                </option>
              ))}
            </select>
            {/* <SelectSearch
              options={options}
              search={true}
              name="fromCity"
              placeholder="Choose city"
              value={fromCity}
            /> */}
          </div>
          <div className="col-md-3">
            {/* <input
              type="text"
              className="form-control"
              placeholder="To"
              id="toCity"
              name="toCity"
              onChange={(e) => onInputChange(e)}
              value={toCity}
            /> */}
            <select
              className="form-control"
              placeholder="To"
              id="toCity"
              name="toCity"
              onChange={(e) => onInputChange(e)}
              required
            >
              <option value="">--Destination--</option>
              {cities.map((row) => (
                <option key={row.id} value={row.name}>
                  {row.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              placeholder="Date"
              id="travelDate"
              name="travelDate"
              onChange={(e) => onInputChange(e)}
              value={travelDate}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="No Of Person"
              id="noOfPerson"
              name="noOfPerson"
              onChange={(e) => onInputChange(e)}
              value={noOfPerson}
              required
              min="1"
              max="50"
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>
      <div className="row mt-3">
        <div className="col-md-12">
          {flightList.length > 0 && (
            <Flights flightData={flight} flightList={flightList} />
          )}
          {flightList.length < 1 && validation.isFound && (
            <div class="alert alert-danger mt-2 text-center" role="alert">
              Ohh! Flight is not found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
