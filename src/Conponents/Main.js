import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Flights from "./Flights";
import Flight from "../Services/Fligth.service";

// import "./Css/SelectSearch.css";
// import SelectSearch from "react-select-search";

const Main = () => {
  const [flight, setFlight] = useState({
    fromCity: "",
    toCity: "",
    travelDate: "",
    noOfPerson : ""
  });

  const [flightList, setFlightList] = useState([]);

  const [cities, setCities] = useState([]);

  const onInputChange = (event) => {
    console.log(event.target.name+' '+event.target.value );
    
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
    console.log('Flight',flight);
    
    Flight.getList(flight, (result) => {
      setFlightList(result.data);
    });
  };

  const loadCities = () => {
    Flight.getCityList((result) => {
      setCities(result.data);
    });

    // setCities(cityResult.data);
  };

  const { fromCity, toCity, travelDate,noOfPerson } = flight;
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
            >
              <option  value=''>--From--</option>
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
            >
              <option value=''>--To--</option>
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
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="No Of Person"
              id="noOfPerson"
              name="noOfPerson"
              onChange={(e) => onInputChange(e)}
              value={noOfPerson}
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
        </div>
      </div>
    </div>
  );
};

export default Main;
