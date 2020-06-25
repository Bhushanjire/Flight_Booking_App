import React from "react";
import { NavLink } from "react-router-dom";
const Flights = (props) => {
  console.log("Flight component", props.flightData);
  let { fromCity, toCity, travelDate } = props.flightData;

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12 mt-3 text-center">
          <h4>
            {fromCity} To {toCity} - ({travelDate})
          </h4>
        </div>
      </div>

      <table className="table mt-2">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Airline</th>
            <th scope="col">Departure</th>
            <th scope="col">Arrival</th>
            <th scope="col">Duration</th>
            <th scope="col">Available Seats</th>
            <th scope="col">Price/Person</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.flightList.map((row) => (
            <tr key={row.id}>
              <th scope="row">1</th>
              <td>{row.flightId.flightName}</td>
              <td>{row.departuteTime}</td>
              <td>{row.arrivalTime}</td>
              <td>{row.duration}</td>
              <td>
                {parseInt(row.flightId.flightTotalSeat) -
                  parseInt(row.bookingSeats)}
              </td>
              <td>Rs. {row.price}</td>
              <td>
                <NavLink exact to={'/booking/'+row.id} className="ml-2">
                  <button type="button" className="btn btn-primary">
                    Continue
                  </button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Flights;
