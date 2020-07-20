import express = require("express");
import ResponceFormat = require("../Configuration/ResponceFormat");
import UserSchema = require("../Database/Schema/UserSchema");
import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");
import nodemailer = require("nodemailer");
import waterfall = require("async-waterfall");

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
                  { expiresIn: "1h" },
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
          let saltRounds = 10;

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
        responce
          .status(200)
          .send(
            ResponceFormat.setResponce(200, true, "All users list", result)
          );
      }
    });
  }

  getBookingList(request: express.request, responce: express.request) {
    let { userId } = request.body;
  }

  forgotPassword(request: express.request, responce: express.request) {
    let { emailId } = request.body;
    console.log('emailId',emailId);
    
    waterfall(
      [
        function (callback) {
          UserSchema.findOne({ emailId: emailId }, (error, result) => {
            if (error) {
              callback(error, null);
            } else {
              if (result) {
                callback(null, result);
              } else {
                responce
                  .status(400)
                  .send(
                    ResponceFormat.setResponce(
                      400,
                      false,
                      "Email ID is not exist",
                      null
                    )
                  );
              }
            }
          });
        },
        function (result, callback) {
          if (result) {
            const transporter = nodemailer.createTransport({
              servicee: "gmail",
              host: "smtp.gmail.com",
              port: 465,
              secure: true, // use SSL
              auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD,
              }, //https://myaccount.google.com/lesssecureapps?pli=1  keep on Less secure app access
            });

            let subject = "Reset Password";
            let body = `<div>Hello ${result.firstName} ${result.lastName}</div> Please <a href=http://localhost:3000/reset-password/${emailId}>Click Here</a> to reset password`;
            const mailOptions = {
              from: "bhushanjire@gmail.com",
              to: emailId,
              subject: subject,
              //  text: body //for text email
              html: body, //for html email
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                callback(error, null);
              } else {
                callback(null, info);
              }
            });
          }
        },
      ],
      function (error, info) {
        if (error) {
          responce
            .status(400)
            .send(
              ResponceFormat.setResponce(
                400,
                false,
                "Error in send forgot password mail",
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
                "Forgot password email send successfully",
                info
              )
            );
        }
        // result now equals 'done'
      }
    );
  }
  resetPassword(request: express.request, responce: express.request) {
    let { emailId, newPassword } = request.body;
    let saltRounds = 10;
    bcrypt.hash(newPassword, saltRounds, function (error, hash) {
      if (error) {
        responce
          .status(400)
          .send(
            ResponceFormat.setResponce(
              400,
              false,
              "error in password hashing",
              error
            )
          );
      } else {
        UserSchema.update(
          { emailId: emailId },
          { $set: { password: hash } },
          { new: true },
          (error, result) => {
            if (error) {
              responce
                .status(400)
                .send(
                  ResponceFormat.setResponce(
                    400,
                    false,
                    "Error in update password",
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
                    "Password reset successfully",
                    result
                  )
                );
            }
          }
        );
      }
    });
  }
}
export = User;
