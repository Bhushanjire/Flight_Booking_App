import mongoose = require("mongoose");
import UserModel = require("../Model/UserModel");
const Mongoose = mongoose.Schema;

const UserSchema = new Mongoose(
  {
    firstName: {
      type: String,
      require: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      require: [true, 'Last name is required'],
    },
    emailId: {
      type: String,
      require: [true, 'Email id is required'],
      unique: true,
      trim: true
    },
    mobileNo: {
      type: String,
      require: [true, 'Mobile No. is required'],
      unique: true,
    },
    photo: {
      type: String,
      default: null
    },
    password: {
      type: String,
      trim: true,
    },
    gender: {
      type: String
    },
    salt: String,
    token: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    bookingIds: [
      {
        type: Mongoose.Types.ObjectId,
        ref: "bookings",
      },
    ],
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

// UserSchema.pre("save", function (next) {
//   console.log("Pre Save Called");
//   next();
// });

// UserSchema.post("save", function (doc, next) {
//   console.log("Post Save Called");
//   next();
// });

const handleE11000 = (error, res, next) => {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
};

// UserSchema.post("save", handleE11000);
// UserSchema.post("update", handleE11000);
// UserSchema.post("findOneAndUpdate", handleE11000);
// UserSchema.post("insertMany", handleE11000);

let User = mongoose.model("Users", UserSchema);

export = User;
