import express = require("express");
import FlightScheduleController = require("../Controller/FlightScheduleController");

const router = express.Router();
class FlightScheduleRoute {
  private _FlightScheduleController: FlightScheduleController;

  constructor() {
    this._FlightScheduleController = new FlightScheduleController();
  }

  get routes() {
    const controller = this._FlightScheduleController;
    router.post("/flightSchedule/create", controller.create);
    router.get("/flightSchedule/list", controller.retrive);
    router.post("/flightSchedule/get-by-id", controller.retriveById);
    router.post("/flightSchedule/search", controller.searchFlight);


    return router;
  }
}

export = FlightScheduleRoute;
