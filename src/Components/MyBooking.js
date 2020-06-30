import React, { useState, useEffect } from "react";
import Flight from "../Services/Fligth.service";
import { useParams,NavLink } from "react-router-dom";

const MyBooking = () => {
  let { id } = useParams();
  const [booking, setBooking] = useState([
    {
      flightSchuleId: 0,
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
        price: 0,
        bookingSeats: [],
        scheduleDate: "",
        departuteTime: "",
        arrivalTime: "",
        duration: "",
      },
      id: 0,
    },
  ]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    Flight.getMyBookings(id)
      .then((result) => {
        setBooking(result.data);
      })
      .catch((error) => {
        console.log("Error in booking list", error);
      });
  };

  return (
    <React.Fragment>
      <div className="container">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fight Name</th>
              <th scope="col">Travel</th>
              <th scope="col">Date</th>
              <th scope="col">Departure Time</th>
              <th scope="col">Arrival Time</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((row, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{row.bookingDetails?.flightId?.flightName}</td>
                <td>
                  {row?.bookingDetails?.fromCityId?.name} -{" "}
                  {row?.bookingDetails?.toCityId?.name}
                </td>
                <td>{row?.bookingDetails?.scheduleDate}</td>

                <td>{row?.bookingDetails?.departuteTime}</td>
                <td>{row?.bookingDetails?.arrivalTime}</td>
                <td>{row?.totalPrice}</td>
                <td>
                  {
                    <NavLink exact to={`/booking/${row?.flightSchuleId}/${row?.seactNumbers?.length}`}>
                    <button type="button" className="btn btn-info">Edit</button>
                    </NavLink>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default MyBooking;
