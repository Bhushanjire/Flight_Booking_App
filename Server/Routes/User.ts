import express = require("express");
import UserController = require("../Controller/UserController");

const router = express.Router();

class UserRoutes {
  private _UserController: UserController;

  constructor() {
    this._UserController = new UserController();
  }

  get routes() {
    const controller = this._UserController;
    router.post("/user/login", controller.login);
    return router;
  }
}
Object.seal(UserRoutes);
export = UserRoutes;
