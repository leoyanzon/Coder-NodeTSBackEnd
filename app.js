const express = require("express");
require('dotenv').config();
const _=require("lodash");

const indexRouter = require("./src/routes/index");
const errorMiddleware = require("./src/middlewares/errorMiddleware")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const products = [{title: "Ejemplo1", price:22, thumbnail: "https://cdn1.iconfinder.com/data/icons/city-flat-2/512/people_person_man_stand_men-512.png"}];
app.get("/health", (_req,res) =>{
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || "undefined",
        health: "up"
    })
})
//Desafios anteriores
app.use("/api", indexRouter);
app.use("/static",express.static(__dirname + "/public"));


//Nuevo desafio con EJS
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (_req,res)=>{
    res.render("pages/form")
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

module.exports = app;