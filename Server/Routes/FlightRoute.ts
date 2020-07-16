import express = require("express");
import FlightController = require("../Controller/FlightController");

const router = express.Router();

class FlightRoute {
  private _FlightController: FlightController;
  constructor() {
    this._FlightController = new FlightController();
  }

  get routes() {
    const controller = this._FlightController;
    router.post("/create-flight", controller.create);
    router.get("/list-flight", controller.retrive);
    return router;
  }
}

export = FlightRoute;
