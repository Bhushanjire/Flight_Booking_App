import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../Css/Booking.css";
import Flight from "../Services/Fligth.service";
import Auth from "../Services/Auth";
import { NavLink, BrowserRouter as Router, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loading } from "../Redux/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import Paypal from "../Components/Paypal";
import moment from 'moment';

import {
  getFlightSchedulById,
  createBooking,
  getBookingById,
  updateBooking,
} from "../Services/PostLoginApi";

const Booking = () => {
  const dispatch = useDispatch();
  const { id, noOfPerson, mode } = useParams();
  const items = [];
  const passengers = [];
  const history = useHistory();
  const [passenger, setPassenger] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [validation, setValidation] = useState({
    seat: false,
    passengers: false,
    bookSuccess: false,
    editMode: true,
  });
  const [previousBooked, setPreviousBooked] = useState({
    id: 0,
    flightScheduleId: 0,
    userId: 0,
    seactNumbers: [],
    passengersName: {},
    totalPrice: 0,
    bookingDetails: {
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
    },
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

  useEffect(() => {
    if (mode == "add") {
      loadSchedule(id);
    } else {
      loadBookingUpdate(id);
    }
  }, []);

  const loadSchedule = async (scheduleId) => {
    dispatch(loading(true));
    let postData = {
      id: scheduleId,
    };
    await getFlightSchedulById(postData)
      .then((result) => {
        let apiResponce = result.data;
        if (apiResponce.isSuccess) {
          setBookingDetails(apiResponce.data);
        }
        dispatch(loading(false));
      })
      .catch((error) => {
        dispatch(loading(false));
        console.log("Error in flight schedule", error);
      });

    // Flight.getFlightScheduleById(scheduleId)
    //   .then((result) => {
    //     dispatch(loading(false));
    //     setBookingDetails(result.data);
    //   })
    //   .catch((error) => {
    //     console.log("Error in getFlightScheduleById", error);
    //   });
  };

  const loadBookingUpdate = (bookingId) => {
    dispatch(loading(true));
    let postData = {
      id: bookingId,
    };
    getBookingById(postData)
      .then((result) => {
        let apiResponce = result.data;
        if (apiResponce.isSuccess) {
          loadSchedule(apiResponce.data.flightScheduleId);
          setSelectedSeat(apiResponce.data.seactNumbers);
          setPreviousBooked(apiResponce.data);
          // setBookingDetails(apiResponce.data);
        }
        dispatch(loading(false));
      })
      .catch((error) => {
        dispatch(loading(false));
        console.log("Error in flight schedule", error);
      });

    // Flight.getFlightBookingById(bookingId)
    // .then((result) => {
    //   if (result) {
    //     loadSchedule(result.data[0].flightSchuleId);
    //     setSelectedSeat(result.data[0].seactNumbers);
    //     setPreviousBooked(result.data[0]);
    //   }
    // })
    // .catch((error) => {
    //   console.log("Error in getFlightBookingById", error);
    // });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // openPopup()
    // return
    dispatch(loading(true));

    if (noOfPerson == selectedSeat.length) {
      setValidation({ ...validation, seat: false });
      let scheduleData = bookingDetails;
      let updatedSeat = [];

      if (mode == "add") {
        scheduleData.bookingSeats = bookingDetails.bookingSeats.concat(
          selectedSeat
        );

        let postData = {
          flightScheduleId: id,
          userId: loginUser._id,
          seactNumbers: selectedSeat,
          passengersName: passenger,
          totalPrice: bookingDetails.price * noOfPerson,
        };
        createBooking(postData)
          .then((result) => {
            let apiResponce = result.data;
            if (apiResponce.isSuccess) {
            }
            dispatch(loading(false));
            setValidation({
              ...validation,
              bookSuccess: true,
              seat: false,
            });
            setTimeout(() => {
              history.push("/my-booking/" + loginUser._id);
            }, 1000);
          })
          .catch((error) => {
            console.log("Error in create booking", error);
          });

        // Flight.updateFlightSchedule(id, scheduleData)
        //   .then((result) => {
        //     let postData = {
        //       flightSchuleId: id,
        //       userId: loginUser.id,
        //       seactNumbers: selectedSeat,
        //       passengersName: passenger,
        //       totalPrice: bookingDetails.price * noOfPerson,
        //     };
        //     Flight.addNewBooking(postData)
        //       .then((result) => {
        //         dispatch(loading(false));

        //         setValidation({
        //           ...validation,
        //           bookSuccess: true,
        //           seat: false,
        //         });
        //         setTimeout(() => {
        //           history.push("/my-booking/" + loginUser.id);
        //         }, 1000);
        //       })
        //       .catch((error) => {
        //         console.log("Error in add new booking", error);
        //       });
        //   })
        //   .catch((error) => {
        //     console.log("Error in updateFlightSchedule", error);
        //   });
      } else {
        updatedSeat = scheduleData.bookingSeats.filter(
          (item) => !previousBooked.seactNumbers.includes(item)
        );
        scheduleData.bookingSeats = updatedSeat;
        // scheduleData.bookingSeats = scheduleData.bookingSeats.concat(
        //   selectedSeat
        // );

        let updatedSeats = scheduleData.bookingSeats.concat(selectedSeat);

        let postData = {
          schedule: {
            id: previousBooked.flightScheduleId._id,
            bookingSeats: updatedSeats,
          },
          booking: {
            id: id,
            seactNumbers: selectedSeat,
            passengersName: Object.values(passenger),
            totalPrice: bookingDetails.price * noOfPerson,
          },
        };
        updateBooking(postData)
          .then((result) => {
            let apiResponce = result.data;
            if (apiResponce.isSuccess) {
              setValidation({
                ...validation,
                bookSuccess: true,
                seat: false,
              });
              setTimeout(() => {
                history.push("/my-booking/" + loginUser._id);
              }, 1000);
            }
            dispatch(loading(false));
          })
          .catch((error) => {
            dispatch(loading(false));
            console.log("Errorn in update booking");
          });

        // Flight.updateFlightSchedule(previousBooked.flightSchuleId, scheduleData)
        //   .then((result) => {
        //     if (result) {
        //       let postData = {
        //         flightScheduleId: previousBooked.flightSchuleId,
        //         userId: loginUser.id,
        //         seactNumbers: selectedSeat,
        //         passengersName: passenger,
        //         totalPrice: bookingDetails.price * noOfPerson,
        //         bookingDetails: scheduleData,
        //       };
        //       Flight.updateBooking(id, postData)
        //         .then((result) => {
        //           dispatch(loading(false));

        //           if (result) {
        //             setValidation({
        //               ...validation,
        //               bookSuccess: true,
        //               seat: false,
        //             });
        //             setTimeout(() => {
        //               history.push("/my-booking/" + loginUser._id);
        //             }, 1000);
        //           }
        //         })
        //         .catch((error) => {
        //           console.log("Error in update booking", error);
        //         });
        //     }
        //   })
        //   .catch((error) => {
        //     console.log("Error in updateFlightSchedule", error);
        //   });
      }

      return;
    } else {
      setValidation({
        seat: true,
      });
      dispatch(loading(false));
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
      if (previousBooked.seactNumbers.includes(i)) {
        addEvent = true;
      }
    }
    if (selectedSeat.includes(i)) {
      isSeatBA = "selected-seats";
      addEvent = true;
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
              key={i}
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
                    {moment(bookingDetails?.scheduleDate).format(
                      "MMMM Do YYYY"
                    )}
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
                <div className="row mb-2">
                  <div className="col-md-5 booking-details-label">
                    Passenger:
                  </div>
                  <div className="col-md-7">{noOfPerson}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-5 booking-details-label">
                    Seat No.:
                  </div>
                  <div className="col-md-7">
                    {previousBooked.seactNumbers.join(",")}
                  </div>
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
                      <React.Fragment>
                        {/* <button type="submit" className="btn btn-warning">
                          {mode == "add"
                            ? "Confirm & Book"
                            : "Confirm & Update"}
                        </button> */}
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          {mode == "add"
                            ? "Confirm & Book"
                            : "Confirm & Update"}
                        </Button>
                        {mode == "add" ? (
                          <Paypal amount={bookingDetails?.price * noOfPerson} />
                        ) : (
                          ""
                        )}
                        &nbsp;
                        <Link exact to="/" className="ml-2">
                          {/* <button type="button" className="btn btn-danger">
                            Cancel
                          </button> */}
                          <Button type="button" variant="contained">
                            Cancel
                          </Button>
                        </Link>
                      </React.Fragment>
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
            <div className="col-md-3 seat-available text-center pt-1">
              Available <FontAwesomeIcon icon={faChair} />
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3 seat-booked text-center pt-1">
              Booked <FontAwesomeIcon icon={faChair} />
            </div>
            <div className="col-md-1"></div>

            <div className="col-md-3 seat-selected text-center pt-1">
              Selected <FontAwesomeIcon icon={faChair} />
            </div>
          </div>

          <div className="row mb-2 seat-block">{items}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Booking;
