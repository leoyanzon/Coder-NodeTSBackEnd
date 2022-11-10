const express = require("express");   //Necesario para express
const {Server: HttpServer} = require("http");
const {Server: IoServer} = require("socket.io")
require('dotenv').config(); //Declaración para uso de .env
const _=require("lodash");  //Declaración para usar librería de chequeo de entradas
const path = require('path');
var morgan = require('morgan')

const indexRouter = require("./src/routes/index"); //Declaración para uso de index.html
const errorMiddleware = require("./src/middlewares/errorMiddleware") //Declaración de middleware

//Creación de app
const app = express();

const http = new HttpServer(app);
const io = new IoServer(http);

app.use(express.json());
app.use(express.urlencoded({extended: true}));



const products = [{title: "Ejemplo1", price:22, thumbnail: "https://cdn1.iconfinder.com/data/icons/city-flat-2/512/people_person_man_stand_men-512.png"}];
const messages = [{message: "hello"}];

//Desafios anteriores
app.use("/api", indexRouter);
app.use("/static",express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, 'public')))

//Nuevo desafio con EJS
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (_req,res)=>{
    res.render("pages/form", {products})
});

app.get("/productos", (_req,res)=>{
    res.render("pages/view", {products})
})

app.post("/productos", (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (_.isNil(title) || _.isNil(price) || _.isNil(thumbnail)){
        res.render("error", {message: "Hay un problema con las variables"})
    } else {
        products.push({title, price, thumbnail });
       res.render("pages/form", {products});
    }
})

io.on("connection", (socket) => {
    console.info("Nuevo cliente conectado");
    socket.emit("UPDATE_DATA", messages);
    socket.emit("UPDATE_PRODUCTS", products);
    socket.on("NEW_MESSAGE_TO_SERVER", data => {
        messages.push(data);
        console.info(messages);
        io.sockets.emit("NEW_MESSAGE_FROM_SERVER", data);
    })
    socket.on("NEW_PRODUCT_TO_SERVER", data => {
        products.push(data);
        console.info(products);
        io.sockets.emit("NEW_PRODUCTS_FROM_SERVER", data);
    })
})

module.exports = {app, http, io};