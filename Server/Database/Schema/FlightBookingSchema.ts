import mongoose = require("mongoose");

const Mongoose = mongoose.Schema;

const FlightBookingSchema = new Mongoose(
  {
    userId: {
      type: Mongoose.Types.ObjectId,
      ref: "Users",
      require: true,
    },
    flightScheduleId: {
      type: Mongoose.Types.ObjectId,
      ref: "FlightSchedule",
      require: true,
    },
    seactNumbers: {
      type: Array,
      require: true,
    },
    passengersName: [],
    totalPrice: {
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
// FlightBookingSchema.index({'$**': 'text'});

let flightBooking = mongoose.model("FlightBooking", FlightBookingSchema);
export = flightBooking;
