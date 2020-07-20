import express = require("express");
import UserController = require("../Controller/UserController");
import ValidateUser = require('../Configuration/ValidateUser');

const router = express.Router();

class UserRoutes {
  private _UserController: UserController;

  constructor() {
    this._UserController = new UserController();
  }

  get routes() {
    const controller = this._UserController;
    router.post("/user/login", controller.login);
    router.post("/user/signup", controller.create);
    router.get("/user/all-users",controller.getAllUsers);
    router.post("/user/forgot-password",controller.forgotPassword);

    // router.get("/booking-list",controller.)
    return router;
  }
}
Object.seal(UserRoutes);
export = UserRoutes;
