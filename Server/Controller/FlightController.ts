import express = require("express");
import FlightSchema = require("../Database/Schema/FlightSchema");
import ResponceFormat = require("../Configuration/ResponceFormat");
class FlightController {
  constructor() {}
  create(request: express.request, responce: express.request) {
    let flightData = request.body;
    FlightSchema.create(flightData, (error, result) => {
      if (error) {
        responce
          .status(400)
          .send(
            ResponceFormat.setResponce(
              400,
              false,
              "Error while flight create",
              null
            )
          );
      } else {
        responce
          .status(201)
          .send(
            ResponceFormat.setResponce(
              201,
              true,
              "Flight created successfully",
              result
            )
          );
      }
    });
  }

  retrive(request: express.request, responce: express.request) {
    FlightSchema.find({}, (error, result) => {
      if (error) {
        responce
          .status(400)
          .send(
            ResponceFormat.setResponce(
              400,
              false,
              "Error while retrive flight",
              null
            )
          );
      } else {
        responce
          .status(200)
          .send(ResponceFormat.setResponce(200, true, "Flight list", result));
      }
    });
  }
}

export = FlightController
