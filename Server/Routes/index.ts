import express = require("express");
import UserRoute = require("../Routes/User");
import CityRoute = require("../Routes/CityRoute");
import FligthRoute = require("../Routes/FlightRoute");
import FlightScheduleRoute = require("../Routes/FlightScheduleRoute");

const app = express();
const APIVersion = "/api/v1";
class BaseRoute {
  constructor() {
    // console.log('In base route constructor')
  }
  get routes() {
    app.use(APIVersion, new UserRoute().routes);
    app.use(APIVersion, new CityRoute().routes);
    app.use(APIVersion, new FligthRoute().routes);
    app.use(APIVersion, new FlightScheduleRoute().routes);

    return app;
  }
}

export = BaseRoute;
