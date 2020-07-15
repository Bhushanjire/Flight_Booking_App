import mongoose = require("mongoose");

const Mongoose = mongoose.Schema;

const BookingSchema = new Mongoose({
    userId : {
        type : Mongoose.Types.ObjectId,
        ref : "Users"
    },
    flightScheduleId :[{
        type : Mongoose.Types.ObjectId,
        ref : "flightSchedule"
    }]

});