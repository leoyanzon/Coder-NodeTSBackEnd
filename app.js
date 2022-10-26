const express = require("express");
const indexRouter = require("./src/routes/index");
const errorMiddleware = require("./src/middlewares/errorMiddleware")

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", indexRouter);

app.use("/static",express.static(__dirname + "/public"));

module.exports = app;