import mongoose = require("mongoose");

interface UserModel extends mongoose.Document {
  _id?: string;
  firstName?: string;
  lastName?: string;
  emailId?: string;
  mobileNo?: string;
  token?: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  bookingIds?: Array<string>;
}

export = UserModel;
