import express = require("express");
import FlightBookingController = require("../Controller/FlightBookingController");
import ValidateUser = require('../Configuration/ValidateUser');
const router = express.Router();

class FlightBookingRoute {
  private _FlightBookingController: FlightBookingController;
  constructor() {
    this._FlightBookingController = new FlightBookingController();
  }

  get routes() {
    const controller = this._FlightBookingController;
    router.post("/flightBooking/create", ValidateUser.auth,controller.create);
    router.get("/flightBooking/retrive", ValidateUser.auth,controller.retrive);
    router.post("/flightBooking/get-by-id", ValidateUser.auth,controller.retriveById);
    router.post("/flightBooking/get-by-userId", ValidateUser.auth,controller.getBookingByUserId);
    router.post("/flightBooking/update", ValidateUser.auth,controller.updateBooking);


    return router;
  }
}
export = FlightBookingRoute;
