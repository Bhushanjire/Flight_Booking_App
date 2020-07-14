import express = require("express");
import UserRoute = require("../Routes/User");

const app = express();
const APIVersion = "/api/v1";
class BaseRoute {
    constructor(){
        // console.log('In base route constructor')
    }
  get routes() {
    app.use(APIVersion, new UserRoute().routes);
    return app;
  }
}

export = BaseRoute;
