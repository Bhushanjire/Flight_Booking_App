import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import flightStyle from "../Css-Module/flight.module.scss";
const Flights = (props) => {
   let { fromCity, toCity, travelDate, noOfPerson } = props.flightData;

  //Using Redux
  // let flightList = [];
  // const searchFlight = useSelector((state) => state.flightReducer)[0];
  // useSelector((state) => {
  //   if (state.flightReducer[1]) {
  //     flightList = state.flightReducer[1];
  //   }
  // });
  // let { fromCity, toCity, travelDate, noOfPerson } = searchFlight;

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12 mt-3 text-center">
          <div className="alert alert-success" role="alert">
            <strong>
              {fromCity} <FontAwesomeIcon icon={faArrowRight} className={flightStyle.right_arrow_icon} /> {toCity} - ({travelDate}
            </strong>
            )
          </div>
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
            <th scope="col">Price</th>
            <th scope="col">Total Price</th>
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
                  parseInt(row.bookingSeats.length)}
              </td>
              <td>Rs. {row.price}</td>
              <td>Rs. {row.price * noOfPerson}</td>
              <td>
                <NavLink
                  exact
                  to={"/booking/" + row.id + "/" + noOfPerson+"/add"}
                  className="ml-2"
                >
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
