import mongoose = require("mongoose");
const Mongoose = mongoose.Schema;

const FlightScheduleSchema = new Mongoose(
  {
    flightId: {
      type: mongoose.Types.ObjectId,
      ref: "Flight",
      require: true,
    },
    fromCityId: {
      type: mongoose.Types.ObjectId,
      ref: "City",
      require: true,
    },
    toCityId: {
      type: mongoose.Types.ObjectId,
      ref: "City",
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    bookingSeats: [],
    scheduleDate: {
      type: Date,
      require: true,
    },
    departuteTime: {
      type: String,
      require: true,
    },
    arrivalTime: {
      type: String,
      require: true,
    },
    duration: {
      type: String,
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

let fligthSchedule = mongoose.model("FlightSchedule", FlightScheduleSchema);

export = fligthSchedule;
