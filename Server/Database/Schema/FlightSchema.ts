import mongoose = require("mongoose");
const Mongoose = mongoose.Schema;
const FlightSchema = new Mongoose(
  {
    flightNumber: {
      type: String,
      require: true,
      unique: true,
    },
    flightName: {
      type: String,
      require: true,
      unique: true,
    },
    flightcompanyName: {
      type: String,
      require: true,
    },
    flightTotalSeat: {
      type: Number,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

let flight = mongoose.model("Flight", FlightSchema);
export = flight;
