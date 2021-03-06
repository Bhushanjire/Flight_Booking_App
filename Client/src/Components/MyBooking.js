import React, { Component, useState, useEffect } from "react";
import Flight from "../Services/Fligth.service";
import { useParams, Link } from "react-router-dom";
import { getMyBookings, loading } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";
import ViewBookingPopup from "./ViewBookingPopup";
import ConfirmPopup from "../Components/ConfirmPopup";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { getUserBooking } from "../Services/PostLoginApi";
import moment from 'moment';
// require("bootstrap/less/bootstrap.less");

class MyBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      booking: [
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
      ],
      search: "",
      activePage: 0,
      perPageLimit: 1,
      pageNumber: 0,
      totalRecords: 0,
      isOpen: false,
      isClose: false,
      rowsPerPage: 10,
      // color : 'Yellow'
      // dispatch : useDispatch()
    };
  }

  // const bookingList = useSelector((state) => state.userReducer);
  // const [popup, setPopup] = useState(false);

  // const [search, setSearch] = useState("");
  // const [activePage, setActivePage] = useState(1);

  // useEffect(() => {
  //   loadBookings(1);
  // }, []);

  componentDidMount() {
    this.loadBookings(this.state.id);
  }

  loadBookings = (activePage = 1) => {
    // console.log("bookingList", bookingList);
    // this.state.dispatch(loading(true));

    let postData = {
      userId: this.state.id,
      rowsPerPage : this.state.rowsPerPage,
      activePage : this.state.activePage,
      searchText : this.state.search 
    };
    getUserBooking(postData)
      .then((result) => {
        let apiResponce = result.data;
        if (apiResponce.isSuccess) {
          this.setState({
            booking: apiResponce.data.bookings,
             totalRecords: apiResponce.data.totalCount,
          });
          // setBooking(result.data);
          // this.state.dispatch(loading(false));
          // dispatch(getMyBookings(postData.userId));
        }
        // this.state.dispatch(loading(false));
      })
      .catch((error) => {
        // this.state.dispatch(loading(false));
        console.log("Error in get user booking", error);
      });

    // Flight.getMyBookings(
    //   this.state.id,
    //   this.state.search,
    //   this.state.activePage + 1,
    //   this.state.perPageLimit
    // )
    //   .then((result) => {
    //     this.setState({
    //       booking: result.data,
    //       totalRecords: result.headers["x-total-count"],
    //     });
    //     setBooking(result.data);
    //     this.state.dispatch(loading(false));
    //     dispatch(getMyBookings(id))
    //   })
    //   .catch((error) => {
    //     console.log("Error in booking list", error);
    //   });
  };

  checkDate = (scheduleDate) => {
    const currentDate =
      new Date().getFullYear() +
      "-" +
      ("0" + (new Date().getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + new Date().getDate()).slice(-2);

    if (new Date(currentDate).getTime() <= new Date(scheduleDate).getTime()) {
      return true;
    } else {
      return false;
    }
  };

  searchHandler = async (e) => {
    await this.setState({
      search: e.target.value,
      activePage: 0,
    });
    this.loadBookings();
  };

  handlePageChange = async (activePage) => {
    // const test = await setActivePage(pageNumber);
    // this.state.activePage = pageNumber;
    await this.setState({
      activePage: activePage,
    });
    this.loadBookings();
  };

  openPopup = (e, data) => {
    let res = this.refs.child.handleShow(data);
  };

  closePopup = (e, value) => {
    let res = this.refs.child.handleClose(e, value);
    if (res) {
      console.log("result", value);
    } else {
      console.log("result", value);
    }
  };

  openConfirmPopup = (e) => {
    let data = {
      heading: "Delete",
      message: "Are you sure, you want to delete?",
    };
    let res = this.refs.confirmPopupRef.handleShow(data);
  };

  closeConfirmPopup = (e, value) => {
    let res = this.refs.confirmPopupRef.handleClose(e, value);
    if (res) {
      console.log("result", value);
    } else {
      console.log("result", value);
    }
  };

  handleChangePage = async (event, newPage) => {
    await this.setState({
      activePage: newPage,
    });
    this.loadBookings();
  };

  handleChangeRowsPerPage = async (event) => {
    await this.setState({
      rowsPerPage: event.target.value,
      activePage: 0,
      rowsPerPage: event.target.value,
    });
    this.loadBookings();
  };

  render() {
    return (
      <React.Fragment>
        <ViewBookingPopup ref="child" close={this.closePopup} />
        <ConfirmPopup ref="confirmPopupRef" close={this.closeConfirmPopup} />

        <div className="container">
          <div className="mb-2">
            <center>
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
                style={{ width: "50%" }}
                onChange={(e) => this.searchHandler(e)}
                name="textSearch"
              />
            </center>
          </div>

          {/* <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fight Name</th>
                <th scope="col">Travel</th>
                <th scope="col">Date</th>
                <th scope="col">Departure Time</th>
                <th scope="col">Arrival Time</th>
                <th scope="col">Seat No.</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.booking.map((row, index) => (
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
                  <td>{row?.seactNumbers.join(",")}</td>
                  <td>Rs. {row?.totalPrice}</td>
                  <td>
                    {
                      <React.Fragment>
                        {this.checkDate(row?.bookingDetails?.scheduleDate) && (
                          <>
                            <Link
                              exact
                              to={`/booking/${row?.id}/${row?.seactNumbers?.length}/edit`}
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                style={{ fontSize: "18px" }}
                                title="Edit"
                              />
                            </Link>
                            &nbsp;
                          </>
                        )}

                        {!this.checkDate(row?.bookingDetails?.scheduleDate) && (
                          // <Link exact to={`/view-booking/${row?.id}`}>
                          //   <FontAwesomeIcon
                          //     icon={faEye}
                          //     style={{ fontSize: "18px", color: "green" }}
                          //     title="View"
                          //   />
                          // </Link>
                          <>
                            <FontAwesomeIcon
                              icon={faEye}
                              style={{ fontSize: "18px", color: "green" }}
                              title="View"
                              onClick={(e) => this.openPopup(e, row)}
                              className="hand-cursor"
                            />{" "}
                            &nbsp;
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={(e) => this.openConfirmPopup()}
                              className="hand-cursor text-danger"
                              title="Not implemented yet"
                            />
                          </>
                        )}
                      </React.Fragment>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          {/* <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.perPageLimit}
                totalItemsCount={this.state.totalRecords}
                pageRangeDisplayed={5}
                itemClass="page-item"
                linkClass="page-link"
                onChange={(e) => this.handlePageChange(e)}
              />
            </div>
          </div> */}
          <Paper>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell key="FightName" align="center">
                      <strong>Fight Name</strong>
                    </TableCell>
                    <TableCell key="Travel" align="center">
                      <strong>Travel</strong>
                    </TableCell>
                    <TableCell key="Date" align="center">
                      <strong>Date</strong>
                    </TableCell>
                    <TableCell key="DepartureTime" align="center">
                      <strong>Departure Time</strong>
                    </TableCell>
                    <TableCell key="ArrivalTime" align="center">
                      <strong>Arrival Time</strong>
                    </TableCell>
                    <TableCell key="SeatNo" align="center">
                      <strong>Seat No</strong>
                    </TableCell>
                    <TableCell key="Price" align="center">
                      <strong>Price</strong>
                    </TableCell>
                    <TableCell key="Action" align="center">
                      <strong>Action</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.booking.map((row) => (
                    <TableRow hover key={row.id}>
                      <TableCell align="center">
                        {row.flightScheduleId?.flightId?.flightName}
                      </TableCell>
                      <TableCell align="center">
                        {row?.flightScheduleId?.fromCityId?.name} -
                        {row?.flightScheduleId?.toCityId?.name}
                      </TableCell>
                      <TableCell align="center">
                        { moment(row?.flightScheduleId?.scheduleDate).format('MMMM Do YYYY') }
                      </TableCell>
                      <TableCell align="center">
                        {row?.flightScheduleId?.departuteTime}
                      </TableCell>
                      <TableCell align="center">
                        {row?.flightScheduleId?.arrivalTime}
                      </TableCell>
                      <TableCell align="center">
                        {row?.seactNumbers.join(",")}
                      </TableCell>
                      <TableCell align="center">
                        Rs. {row?.totalPrice}
                      </TableCell>
                      <TableCell align="center">
                        {
                          <React.Fragment>
                            {this.checkDate(
                              row?.flightScheduleId?.scheduleDate
                            ) && (
                              <>
                                <Link
                                  exact
                                  to={`/booking/${row?._id}/${row?.seactNumbers?.length}/edit`}
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    style={{ fontSize: "18px" }}
                                    title="Edit"
                                  />
                                </Link>
                                &nbsp;
                              </>
                            )}

                            {/* {
                              this.state.color =='Green' ? 'Green' : this.state.color=='Yellow' ? 'Yellow' : 'Red'
                            } */}

                            {!this.checkDate(
                              row?.flightScheduleId?.scheduleDate
                            ) && (
                              // <Link exact to={`/view-booking/${row?.id}`}>
                              //   <FontAwesomeIcon
                              //     icon={faEye}
                              //     style={{ fontSize: "18px", color: "green" }}
                              //     title="View"
                              //   />
                              // </Link>
                              <>
                                <FontAwesomeIcon
                                  icon={faEye}
                                  style={{ fontSize: "18px", color: "green" }}
                                  title="View"
                                  onClick={(e) => this.openPopup(e, row)}
                                  className="hand-cursor"
                                />{" "}
                                &nbsp;
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  onClick={(e) => this.openConfirmPopup()}
                                  className="hand-cursor text-danger"
                                  title="Not implemented yet"
                                />
                              </>
                            )}
                          </React.Fragment>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[2, 4, 6]}
              component="div"
              count={this.state.totalRecords}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.activePage}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default MyBooking;
