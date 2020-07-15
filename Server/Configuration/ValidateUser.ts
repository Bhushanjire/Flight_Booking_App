import jwt = require("jsonwebtoken");
import ResponceFormat = require("../Configuration/ResponceFormat");

class ValidateUser {
  static auth = (request, responce, next) => {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader) {
      const token = request.headers.authorization.split(" ")[1];
      // const options = { expiresIn: "24h" };
      try {
        jwt.verify(token, "flightBooking", (error, result) => {
          if (error) {
            return responce
              .status(401)
              .send(
                ResponceFormat.setResponce(401, false, "Error in token", error)
              );
          } else {
            if (result) {
              next();
            } else {
              return responce
                .status(401)
                .send(
                  ResponceFormat.setResponce(401, false, "Token expired", error)
                );
            }
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    } else {
      responce
        .status(401)
        .send(ResponceFormat.setResponce(401, false, "Token Required", null));
    }
  };
}

export = ValidateUser;
