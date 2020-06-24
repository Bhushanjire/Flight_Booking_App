import React from "react";

const Flights = (props) => {
  console.log("flightData", props.flightData);

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12 mt-3 text-center">
          <h4>Pune To Mumbai - (25 June 2020)</h4>
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
            <th scope="col">Price/Person</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Indigo</td>
            <td>12.30 pm</td>
            <td>03.30 pm</td>
            <td>3h 0m</td>
            <td>Rs. 5550</td>
            <td>
              <button type="button" className="btn btn-primary">
                Continue
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Flights;
