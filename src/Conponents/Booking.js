import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Css/Booking.css";
import Flight from "../Services/Fligth.service";

const Booking = () => {
  const { id } = useParams();

  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = () => {
    Flight.getFlightScheduleById(id, (result) => {
      console.log("Schedule Details", result);
      setBookingDetails(result.data);
    });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-4 booking-details">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h3>Booking Details</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 booking-details">
          <div className="row">
            <div className="col-md-5">
              <div className="seat text-center pt-1">1</div>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-5">
              <div className="seat text-center pt-1">2</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Booking;
