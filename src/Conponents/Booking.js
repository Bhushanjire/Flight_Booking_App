import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Css/Booking.css";
import Flight from "../Services/Fligth.service";
import Header from "../includes/header";
import { render } from "@testing-library/react";
import axios from "axios";

const Booking = () => {
  const { id, noOfPerson } = useParams();
  const items = [];
  const passengers = [];
  const selectedSeats = [];
  const [passenger, setPassenger] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState([]);
  let loginUser = JSON.parse(localStorage.getItem("react-user"));

  const [bookingDetails, setBookingDetails] = useState({
    id: 0,
    flightId: {
      id: 0,
      flightNumber: "",
      flightName: "",
      flightcompanyName: "",
      flightTotalSeat: 0,
    },
    fromCityId: {
      id: 0,
      name: "",
      state: "",
      country: "",
    },
    toCityId: {
      id: 0,
      name: "",
      state: "",
      country: "",
    },
    price: "",
    bookingSeats: [],
    scheduleDate: "",
    departuteTime: "",
    arrivalTime: "",
    duration: "",
  });

  const loadSchedule = () => {
    Flight.getFlightScheduleById(id, (result) => {
      setBookingDetails(result.data);
    });
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    Flight.updateFlightSchedule(id, bookingDetails, (result) => {
      console.log("updateFlightSchedule", result);
      let postData = {
        flightSchuleId: id,
        userId: loginUser.id,
        seactNumbers: selectedSeats,
        passengersName: passenger,
        totalPrice: bookingDetails.price * noOfPerson,
      };
      Flight.addNewBooking(postData, (result) => {
        console.log("Add booking", result);
      });
    });
  };

  const selectSeat = (e, seatNo) => {
    if (selectedSeats.length <= noOfPerson) {
      selectedSeats.push(seatNo);
      bookingDetails.bookingSeats.push(seatNo);
    } else {
      console.log("else");
    }
  };

  for (let i = 1; i <= 200; i++) {
    let addDiv = false;
    if (i % 3 == 0) {
      addDiv = true;
    }

    let isSeatBA = "background-color";

    if (bookingDetails.bookingSeats.includes(i)) {
      isSeatBA = "booked-seats";
    }

    let selected = [31, 67, 90, 100, 101];

    if (selected.includes(i)) {
      isSeatBA = "selected-seats";
    }

    items.push(
      <React.Fragment>
        <div className="col-md-1 col-size" key={i + 2}>
          <div
            className={"seat text-center pt-1 " + isSeatBA}
            key={i}
            onClick={(e) => selectSeat(e, i)}
          >
            {i}
          </div>
        </div>
        {addDiv && <div className="col-md-3" key={i + 1}></div>}
      </React.Fragment>
    );
  }

  const onInputChange = (event) => {
    setPassenger({ ...passenger, [event.target.name]: event.target.value });
  };

  for (let i = 1; i <= noOfPerson; i++) {
    passengers.push(
      <React.Fragment>
        <div className="row mb-2">
          <div className="col-md-5 booking-details-label">Passanger {i} :</div>
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name={"Passanger" + i}
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {/* <Header/> */}
      <div className="row">
        <div className="col-md-4 booking-details">
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="card ml-2">
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col-md-12 text-center">
                    <h3>Booking Details</h3>
                  </div>
                </div>
                <div className="row  mb-2">
                  <div className="col-md-12 text-center">
                    {bookingDetails?.fromCityId?.name} To{" "}
                    {bookingDetails?.toCityId?.name}
                  </div>
                </div>
                <div className="row  mb-2">
                  <div className="col-md-12 text-center">
                    {bookingDetails?.scheduleDate}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-5 booking-details-label">
                    Flight Name:
                  </div>
                  <div className="col-md-7">
                    {bookingDetails?.flightId?.flightName}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-5 booking-details-label">
                    Departure Time:
                  </div>
                  <div className="col-md-7">
                    {bookingDetails?.departuteTime}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-5 booking-details-label">
                    Arrival Time:
                  </div>
                  <div className="col-md-7">{bookingDetails?.arrivalTime}</div>
                </div>
                {passengers}

                <div className="row mb-2">
                  <div className="col-md-5 booking-details-label">Price:</div>
                  <div className="col-md-7">
                    Rs. {bookingDetails?.price * noOfPerson}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-warning">
                      Confirm & Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6 booking-details">
          <div className="row mb-2 text-center seat-label">
            <div className="col-md-2 seat-available text-center pt-1">
              Available
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-2 seat-booked text-center pt-1">Booked</div>
            <div className="col-md-2"></div>

            <div className="col-md-2 seat-selected text-center pt-1">Selected</div>

          </div>

          <div className="row mb-2">{items}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Booking;
