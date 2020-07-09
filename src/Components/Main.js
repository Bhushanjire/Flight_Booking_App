import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Flights from "./Flights";
import Flight from "../Services/Fligth.service";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";



import {
  flightSearch,
  getFlightScheduleList,
  loading,
  filter,
} from "../Redux/Actions";

const Main = () => {
  const [flight, setFlight] = useState({
    fromCity: "",
    toCity: "",
    travelDate: "",
    noOfPerson: "",
  });

  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filterReducer);
  console.log("Filter Form main", filter);

  const currentDate =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  const [flightList, setFlightList] = useState([]);
  const [cities, setCities] = useState([]);
  const [validation, setValidation] = useState({
    isFound: false,
  });

  const onInputChange = (event) => {
    setFlight({ ...flight, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    // flightData = flight;
    loadCities();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(flightSearch(flight));
    dispatch(loading(true));
    loadData();
  };

  const loadData = () => {
    setValidation({
      isFound: true,
    });
    Flight.getList(flight)
      .then((result) => {
        setFlightList(result.data);
        dispatch(getFlightScheduleList(result.data));
        dispatch(loading(false));
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

            {/* <select
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
            </select> */}
            <InputLabel id="fromCity">Source</InputLabel>
            <Select
              placeholder="From"
              id="fromCity"
              name="fromCity"
              onChange={(e) => onInputChange(e)}
              required
              style={{ width: "100%" }}
            >
              <MenuItem value="">--Select--</MenuItem>
              {cities.map((row) => (
                <MenuItem value={row.name}>{row.name}</MenuItem>
              ))}
            </Select>

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
            {/* <select
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
            </select> */}
            <InputLabel id="toCity">Destination</InputLabel>
            <Select
              placeholder="To"
              id="toCity"
              name="toCity"
              onChange={(e) => onInputChange(e)}
              required
              style={{ width: "100%" }}
            >
              <MenuItem value="">--Select--</MenuItem>
              {cities.map((row) => (
                <MenuItem value={row.name}>{row.name}</MenuItem>
              ))}
            </Select>
          </div>
          <div className="col-md-2">
            {/* <input
              type="date"
              className="form-control"
              placeholder="Date"
              id="travelDate"
              name="travelDate"
              onChange={(e) => onInputChange(e)}
              value={travelDate}
              required
              min={currentDate}
            /> */}
            <TextField
              type="date"
              className="form-control"
              placeholder="Date"
              id="travelDate"
              name="travelDate"
              onChange={(e) => onInputChange(e)}
              value={travelDate}
              required
              min={currentDate}
            />
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
    </MuiPickersUtilsProvider>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="travelDate"
              label="Travel Date"
              value={travelDate}
              onChange={(e) => onInputChange(e)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            /> */}
          </div>
          <div className="col-md-2">
            {/* <input
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
            /> */}
            <TextField
              id="standard-basic"
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
              label="Passengers"
            />
          </div>
          <div className="col-md-2">
            {/* <button type="submit" className="btn btn-primary">
              Search
            </button> */}

            <Button variant="contained" type="submit" color="primary">
              Search
            </Button>
          </div>
        </div>
      </form>
      <div className="row mt-3">
        <div className="col-md-12">
          {flightList.length > 0 && (
            <Flights flightData={flight} flightList={flightList} />
            //Using redux
            // <Flights />
          )}
          {flightList.length < 1 && validation.isFound && (
            <div className="alert alert-danger mt-2 text-center" role="alert">
              Ohh! Flight is not found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
