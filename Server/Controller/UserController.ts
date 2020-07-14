import Express = require("express");
import ResponceFormat = require("../Configuration/ResponceFormat");
class User {
  constructor() {}
  login = (request: Express.Request, responce: Express.Request) => {
    responce.send(
      ResponceFormat.setResponce(200, true, "Login Successfull", {
        name: "bhushan",
        email: "bhushanjire@gmail.com",
      })
    );
  };
}
export = User;
