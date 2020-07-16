import express = require("express");
import FlightBookingController = require("../Controller/FlightBookingController");
const router = express.Router();

class FlightBookingRoute {
  private _FlightBookingController: FlightBookingController;
  constructor() {
    this._FlightBookingController = new FlightBookingController();
  }

  get routes() {
    const controller = this._FlightBookingController;
    router.post("/flightBooking/create", controller.create);
    router.get("/flightBooking/retrive", controller.retrive);
    router.post("/flightBooking/get-by-id", controller.retriveById);
    router.post("/flightBooking/get-by-userId", controller.getBookingByUserId);

    return router;
  }
}
export = FlightBookingRoute;
