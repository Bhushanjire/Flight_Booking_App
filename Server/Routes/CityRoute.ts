import express = require("express");
import CityController = require("../Controller/CityController");
import ValidateUser = require("../Configuration/ValidateUser");

const router = express.Router();

class CityRoute {
  private _CityController: CityController;

  constructor() {
    this._CityController = new CityController();
  }

  get routes() {
    const controller = this._CityController;
    router.get("/list-city",  controller.getAllCities);
    router.post("/create-city", ValidateUser.auth, controller.createCity);
    return router;
  }
}
Object.seal(CityRoute);
export = CityRoute;
