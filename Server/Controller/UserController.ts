import express = require("express");
import ResponceFormat = require("../Configuration/ResponceFormat");
import UserSchema = require("../Database/Schema/UserSchema");
import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");

class User {
  constructor() {}
  login = (request: express.request, responce: express.request) => {
    let { emailId, password } = request.body;
    UserSchema.findOne({ emailId: emailId }, (error, result) => {
      if (error) {
        responce
          .status(401)
          .send(ResponceFormat.setResponce(401, false, "Login Error", error));
      } else {
        if (result) {
          bcrypt.compare(password, result.password, function (err, hashResult) {
            if (err) {
              responce
                .status(201)
                .send(
                  ResponceFormat.setResponce(
                    201,
                    false,
                    "Error in password compare",
                    err
                  )
                );
            } else {
              if (hashResult) {
                jwt.sign(
                  {
                    data: result.emailId,
                  },
                  "flightBooking",
                  { expiresIn: '1h'},
                  (err, token) => {
                    result.token = token;
                    responce
                      .status(200)
                      .send(
                        ResponceFormat.setResponce(
                          200,
                          true,
                          "Login Successfull",
                          result
                        )
                      );
                  }
                );
              } else {
                responce
                  .status(401)
                  .send(
                    ResponceFormat.setResponce(
                      401,
                      false,
                      "Wrong Password",
                      null
                    )
                  );
              }
            }
          });
        } else {
          responce
            .status(401)
            .send(
              ResponceFormat.setResponce(401, false, "Wrong Email", result)
            );
        }
      }
    });
  };

  create(request: express.request, responce: express.request) {
    let userData = request.body;
    const saltRounds = 10;
    UserSchema.findOne({ emailId: userData.emailId }, (error, emailResult) => {
      if (error) {
        responce
          .status(401)
          .send(
            ResponceFormat.setResponce(
              401,
              false,
              "Error in email checking",
              null
            )
          );
      } else {
        if (emailResult) {
          responce
            .status(200)
            .send(
              ResponceFormat.setResponce(
                200,
                false,
                "EmailID is already exist",
                null
              )
            );
        } else {
          bcrypt.hash(userData.password, saltRounds, function (err, hash) {
            if (err) {
              responce
                .status(400)
                .send(
                  ResponceFormat.setResponce(
                    400,
                    false,
                    "error in password hashing",
                    null
                  )
                );
            } else {
              userData.password = hash;
              UserSchema.create(userData, (error, result) => {
                if (error) {
                  responce
                    .status(400)
                    .send(
                      ResponceFormat.setResponce(
                        400,
                        false,
                        "User signup error",
                        error
                      )
                    );
                } else {
                  responce
                    .status(200)
                    .send(
                      ResponceFormat.setResponce(
                        200,
                        true,
                        "Signup successfully",
                        result
                      )
                    );
                }
              });
            }
          });
        }
      }
    });
  }

  getAllUsers(request: express.request, responce: express.request) {
    UserSchema.find({}, (error, result) => {
      if (error) {
        responce
          .status(400)
          .send(
            ResponceFormat.setResponce(400, false, "Error in user list", null)
          );
      } else {
        responce.status(200).send(ResponceFormat.setResponce(200,true, "All users list", result));
      }
    });
  }

  getBookingList(request: express.request, responce: express.request) {
    let { userId } = request.body;
  }
}
export = User;
