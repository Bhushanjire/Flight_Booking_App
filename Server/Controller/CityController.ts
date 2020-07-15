import express = require("express");
import CitySchema = require("../Database/Schema/CitySchema");
import ResponceFormat = require("../Configuration/ResponceFormat");

class CityController {
  constructor() {}

  createCity(request: express.request, responce: express.request) {
      console.log('Create City',request);
      
    CitySchema.create(request.body, (error, result) => {
      if (error) {
        responce
          .status(400)
          .send(
            ResponceFormat.setResponce(400, false, "Error in create city", null)
          );
      } else {
        responce
          .status(200)
          .send(
            ResponceFormat.setResponce(
              200,
              true,
              "City created successfully",
              result
            )
          );
      }
    });
  }

  getAllCities(request: express.request, responce: express.request) {
    CitySchema.find({}, (error, result) => {
      if (error) {
        responce
          .status(400)
          .send(
            ResponceFormat.setResponce(400, false, "Error in city list", error)
          );
      } else {
        responce
          .status(200)
          .send(ResponceFormat.setResponce(200, false, "All cities", result));
      }
    });
  }
}

export = CityController;
