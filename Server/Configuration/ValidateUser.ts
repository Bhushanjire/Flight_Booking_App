const jwt = require("jsonwebtoken");
import ResponceFormat = require("../Configuration/ResponceFormat");

class ValidateUser {
  static auth(request, responce, next) {
    const authorizationHeader = request.header.authorization;
    if (authorizationHeader) {
      const token = request.header.authorization.split(" ")[1];
      const options = { expiresIn: "24h", issuer: "Bhushan-Jire" };
      try {
        jwt.verfy(token, "flightBooking", options, (error, result) => {
          if (error) {
            responce.send(
              ResponceFormat.setResponce(201, false, "Error in token", error)
            );
          } else {
            if (result) {
              ResponceFormat.setResponce(201, false, "Token expired", error);
            } else {
              next();
            }
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    } else {
      responce.send(
        ResponceFormat.setResponce(401, false, "Token Required", null)
      );
    }
  }
}

export = ValidateUser;
