import express from "express";
import bodyParser from "body-parser";
import faker from "faker";
import times from "lodash.times";
import random from "lodash.random";
import db from "./models";
import users from "./src/routes/users";
var cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(express.static("app/public"));
app.use(cors())
users(app, db);

db.sequelize.sync().then(() => {
  // populate author table with dummy data
  app.listen(8080, () => console.log("App listening on port 8080!"));
});