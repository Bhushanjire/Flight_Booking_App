import mongoose = require("mongoose");

const Mongoose = mongoose.Schema;
const CitySchema = new Mongoose(
  {
    name: {
      type: String,
      require: true,
      unique : true
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

let city = mongoose.model("City", CitySchema);

export = city;
