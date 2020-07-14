import React, { useState, Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import flightStyle from "../Css-Module/flight.module.scss";

class ViewBookingPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isClose: false,
      booking: {},
    };
  }

  handleClose = (e, value) => {
    this.setState({
      isClose: true,
      isOpen: false,
    });
    return value;
  };
  handleShow = (data) => {
    this.setState({
      booking: data,
    });
    this.setState({
      isOpen: true,
      isClose: true,
    });
  };

  render() {
    return (
      <>
        <Modal
          show={this.state.isOpen}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">
              {this.state.booking.bookingDetails?.fromCityId?.name}&nbsp;
              <FontAwesomeIcon
                icon={faArrowRight}
                className={flightStyle.right_arrow_icon}
              />
              &nbsp;
              {this.state.booking.bookingDetails?.toCityId?.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-2">
              <div className="col-md-5 ft-w-600">Flight Name</div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">
                {this.state.booking.bookingDetails?.flightId?.flightName}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-5 ft-w-600">Date</div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">
                {this.state.booking.bookingDetails?.scheduleDate}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-5 ft-w-600">Departure Time </div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">
                {this.state.booking.bookingDetails?.departuteTime}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-5 ft-w-600">Arrival Time</div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">
                {this.state.booking.bookingDetails?.arrivalTime}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-5 ft-w-600">Duration</div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">
                {this.state.booking.bookingDetails?.duration}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) => this.props.close(e, false)}
            >
              Close
            </Button>
          
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ViewBookingPopup;
