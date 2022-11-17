const express = require("express");   //Necesario para express
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io")
require('dotenv').config(); //Declaración para uso de .env

const _=require("lodash");  //Declaración para usar librería de chequeo de entradas
var morgan = require('morgan');

const indexRouter = require("./src/routes/index"); //Declaración para uso de index.html
const errorMiddleware = require("./src/middlewares/errorMiddleware"); //Declaración de middleware
const authMiddleware = require("./src/middlewares/authMiddleware");

//Creación de app
const app = express();
const http = new HttpServer(app);
const io = new IoServer(http);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", indexRouter);
app.use(errorMiddleware);
app.use(authMiddleware);

module.exports = { http };