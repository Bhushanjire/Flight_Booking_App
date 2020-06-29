import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../Css/Booking.css";
import Flight from "../Services/Fligth.service";
import Auth from "../Services/Auth";
import {
  Link,
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
const Booking = () => {
  const { id, noOfPerson } = useParams();
  const items = [];
  const passengers = [];
  const tempSelectedSeats = [];
  const temp = [];
  const history = useHistory();
  const [passenger, setPassenger] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [validation, setValidation] = useState({
    seat: false,
    passengers: false,
    bookSuccess: false,
  });
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
    Flight.getFlightScheduleById(id)
      .then((result) => {
        setBookingDetails(result.data);
      })
      .catch((error) => {
        console.log("Error in getFlightScheduleById", error);
      });
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    if (noOfPerson == selectedSeat.length) {
      setValidation({ ...validation, seat: false });
      let scheduleData = bookingDetails;

      scheduleData.bookingSeats = bookingDetails.bookingSeats.concat(
        selectedSeat
      );

      Flight.updateFlightSchedule(id, scheduleData)
        .then((result) => {
          let postData = {
            flightSchuleId: id,
            userId: loginUser.id,
            seactNumbers: selectedSeat,
            passengersName: passenger,
            totalPrice: bookingDetails.price * noOfPerson,
            bookingDetails : scheduleData
          };
          Flight.addNewBooking(postData)
            .then((result) => {
              setValidation({ ...validation, bookSuccess: true,seat : false });
              setTimeout(() => {
                history.push("/my-booking/"+loginUser.id);
              }, 1000);
              // window.location = "/";
            })
            .catch((error) => {
              console.log("Error in add new booking", error);
            });
        })
        .catch((error) => {
          console.log("Error in updateFlightSchedule", error);
        });
    } else {
      setValidation({
        seat: true,
      });
    }
  };

  const selectSeat = (e, seatNo) => {
    if (selectedSeat.length < noOfPerson) {
      if (selectedSeat.includes(seatNo)) {
        setSelectedSeat(selectedSeat.filter((item) => item != seatNo));
      } else {
        setSelectedSeat([...selectedSeat, seatNo]);
      }
    } else {
      if (selectedSeat.includes(seatNo)) {
        setSelectedSeat(selectedSeat.filter((item) => item != seatNo));
      }
    }
  };

  for (let i = 1; i <= bookingDetails.flightId.flightTotalSeat; i++) {
    let addDiv = false;
    if (i % 3 == 0) {
      addDiv = true;
    }
    let addEvent = true;
    let isSeatBA = "background-color";

    if (bookingDetails.bookingSeats.includes(i)) {
      isSeatBA = "booked-seats";
      addEvent = false;
    }
    if (selectedSeat.includes(i)) {
      isSeatBA = "selected-seats";
    }
    items.push(
      <React.Fragment>
        <div className="col-md-1 col-size" key={i + 2}>
          <div
            className={"seat text-center pt-1 " + isSeatBA}
            key={i}
            onClick={addEvent ? (e) => selectSeat(e, i) : null}
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
              required
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="row mt-3">
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
                    {Auth.authenticated() && (
                      <button type="submit" className="btn btn-warning">
                        Confirm & Book
                      </button>
                    )}

                    {!Auth.authenticated() && (
                      <NavLink exact to="/login">
                        <button type="button" className="btn btn-warning">
                          Login for booking
                        </button>
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6 booking-details">
          {validation.seat && (
            <div className="text-danger text-center mb-2">
              Please select seat(s)
            </div>
          )}

          {validation.bookSuccess && (
            <div className="alert alert-success" role="alert">
              Flight booked successfully
            </div>
          )}

          <div className="row mb-2 text-center seat-label">
            <div className="col-md-2 seat-available text-center pt-1">
              Available
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-2 seat-booked text-center pt-1">Booked</div>
            <div className="col-md-2"></div>

            <div className="col-md-2 seat-selected text-center pt-1">
              Selected
            </div>
          </div>

          <div className="row mb-2 seat-block">{items}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Booking;
