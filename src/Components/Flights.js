import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import flightStyle from "../Css-Module/flight.module.scss";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const Flights = (props) => {
  const classes = useStyles();
  let { fromCity, toCity, travelDate, noOfPerson } = props.flightData;

  // Using Redux
  // const searchFlight = useSelector((state) => state.flightReducer)[0];
  // useSelector((state) => {
  //   if (state.flightReducer.flightList.length > 0) {
  //     console.log("flightSearchRedux", state.flightReducer.flightSearch);
  //     console.log("flightListRedux", state.flightReducer.flightList);
  //   }
  // });

  // let { fromCity, toCity, travelDate, noOfPerson } = searchFlight;

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12 mt-3 text-center">
          <div className="alert alert-success" role="alert">
            <strong>
              {fromCity}{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                className={flightStyle.right_arrow_icon}
              />{" "}
              {toCity} - ({travelDate}
            </strong>
            )
          </div>
        </div>
      </div>

      {/* <table className="table mt-2">
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
                  to={"/booking/" + row.id + "/" + noOfPerson + "/add"}
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
      </table> */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Airline</StyledTableCell>
              <StyledTableCell align="center">Departure</StyledTableCell>
              <StyledTableCell align="center">Arrival</StyledTableCell>
              <StyledTableCell align="center">Duration</StyledTableCell>
              <StyledTableCell align="center">Available Seats</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Total Price</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.flightList.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center">
                  {row.flightId.flightName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.departuteTime}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.arrivalTime}
                </StyledTableCell>
                <StyledTableCell align="center">{row.duration}</StyledTableCell>
                <StyledTableCell align="center">
                  {parseInt(row.flightId.flightTotalSeat) -
                    parseInt(row.bookingSeats.length)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  Rs. {row.price}
                </StyledTableCell>
                <StyledTableCell align="center">
                  Rs. {row.price * noOfPerson}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <NavLink
                    exact
                    to={"/booking/" + row.id + "/" + noOfPerson + "/add"}
                    className="ml-2"
                  >
                    {/* <button type="button" className="btn btn-primary">
                      Continue
                    </button> */}
                    <Button type="button" variant="contained" color="primary">
                      Continue
                    </Button>
                  </NavLink>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Flights;
