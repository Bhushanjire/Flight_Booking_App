import React, { useState, useEffect } from "react";
import Flight from "../Services/Fligth.service";
import { useParams, Link } from "react-router-dom";
import { getMyBookings, loading } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

const MyBooking = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const bookingList = useSelector((state) => state.userReducer);
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

  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    activePage: 1,
    limit : 2
  });

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    // console.log("bookingList", bookingList);
    dispatch(loading(true));
    Flight.getMyBookings(id, search,pagination.activePage,pagination.limit)
      .then((result) => {
        setBooking(result.data);
        dispatch(loading(false));

        // dispatch(getMyBookings(id))
      })
      .catch((error) => {
        console.log("Error in booking list", error);
      });
  };

  const checkDate = (scheduleDate) => {
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

  const searchHandler = (e) => {
    console.log("searchHandler", e.target.value);
    setSearch(e.target.value);
    loadBookings();
  };

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setPagination({...pagination, activePage: pageNumber,
    limit : 2 });
    loadBookings();
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="mb-2">
          <center>
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "50%" }}
              onChange={(e) => searchHandler(e)}
              name="textSearch"
            />
          </center>
        </div>

        <table className="table">
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
                <td>{row?.seactNumbers.join(",")}</td>
                <td>Rs. {row?.totalPrice}</td>
                <td>
                  {
                    <React.Fragment>
                      {checkDate(row?.bookingDetails?.scheduleDate) && (
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
                      )}

                      {!checkDate(row?.bookingDetails?.scheduleDate) && (
                        <Link exact to={`/view-booking/${row?.id}`}>
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{ fontSize: "18px", color: "green" }}
                            title="View"
                          />
                        </Link>
                      )}
                    </React.Fragment>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <Pagination
            activePage={pagination.activePage}
            itemsCountPerPage={pagination.limit}
            totalItemsCount={6}
            pageRangeDisplayed={5}
            itemClass="page-item"
            linkClass="page-link"
            onChange={(e) => handlePageChange(e)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyBooking;
