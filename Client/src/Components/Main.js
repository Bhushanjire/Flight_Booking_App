import "date-fns";
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

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Autocomplete from "@material-ui/lab/Autocomplete";

import { getCities } from "../Services/PostLoginApi";

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
    travelDate: new Date(),
    noOfPerson: "",
  });

  useSelector((state) => {
    if (state.flightReducer.flightList.length > 0) {
      console.log("flightSearchRedux", state.flightReducer.flightSearch);
      console.log("flightListRedux", state.flightReducer.flightList);
    }
  });

  const dispatch = useDispatch();

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

  const handleDateChange = (date) => {
    let selectedDate =
      new Date(date).getFullYear() +
      "-" +
      ("0" + (new Date(date).getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + new Date(date).getDate()).slice(-2);
    setFlight({ ...flight, travelDate: selectedDate });
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
    // Flight.getCityList()
    //   .then((result) => {
    //     setCities(result.data);
    //   })
    //   .catch((error) => {
    //     console.log("Error in get city list", error);
    //   });

    getCities()
      .then((cityResponce) => {
        let apiResponce = cityResponce.data;
        setCities(apiResponce.data);
        console.log("cityResponce", apiResponce);
      })
      .catch((error) => {
        console.log("Error in city list", error);
      });

    // setCities(cityResult.data);
  };

  const onSourceChange = (event, value) => {
    console.log("value", value);

    setFlight({ ...flight, fromCity: value });
  };

  const onDestinationChange = (event, value) => {
    setFlight({ ...flight, toCity: value });
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
            {/* <InputLabel id="fromCity">Source</InputLabel>
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
            </Select> */}

            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={cities.map((option) => option.name)}
              onChange={(e, value) => onSourceChange(e, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Source"
                  margin="normal"
                  variant="outlined"
                  name="source"
                  InputProps={{ ...params.InputProps, type: "search" }}
                  required
                />
              )}
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
            {/* <InputLabel id="toCity">Destination</InputLabel>
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
            </Select> */}

            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={cities.map((option) => option.name)}
              onChange={(e, value) => onDestinationChange(e, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination"
                  margin="normal"
                  variant="outlined"
                  name="destination"
                  InputProps={{ ...params.InputProps, type: "search" }}
                  required
                />
              )}
            />
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
            {/* <TextField
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Travel Date"
                  value={travelDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  required
                  minDate={new Date()}
                />
              </Grid>
            </MuiPickersUtilsProvider>
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
              min={1}
              max={50}
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
