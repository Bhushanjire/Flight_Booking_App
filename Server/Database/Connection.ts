import mongoose = require("mongoose");
const DBURL = "mongodb://localhost/flightBooking";
const Connection = mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    // console.log("Database Connected : ", result);
    console.log("Database Connected..........");

  })
  .catch((error) => {
    // console.log("Error in Database Connection : ", error);
    console.log("Error in Database Connection......");

  });
