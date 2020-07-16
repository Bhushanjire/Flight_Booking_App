import express = require("express");
const app = express();
const bodyParser = require("body-parser");
import env = require("dotenv");
env.config();
const cors = require("cors");
const DBConnection = require("../Server/Database/Connection");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
import BaseRoute = require("../Server/Routes/index");
app.use(new BaseRoute().routes)
app.listen(4000, () => {
  console.log("Server start on port 4000");
});
