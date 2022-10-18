require('dotenv').config();
const express = require("express");
const {Contenedor} = require("./desafio2");

const PORT = process.env.PORT || 8080;
const app = express();

let products = ["inicio"];

async function Creacion(){
    const newFile = await new Contenedor("productos");

    await newFile.save({title:"Lord of rings", price: 10, thumbnail: "www.url1.com"});
    await newFile.save({title:"Game of thrones", price: 9, thumbnail: "www.url2.com"});
    await newFile.save({title:"Avengers 3: Thanos return", price: 11, thumbnail: "www.url3.com"});
    products = await newFile.getAll();
}
Creacion();

const server = app.listen(PORT, ()=>{
    console.log("Server up and running on port:", server.address().port)
})


app.get("/", (_req,res) => {
    res.status(200).send(`<h1>Por favor ingresar a la ruta /productos para obtener todos los productos</h1>`)
})

app.get("/productos", (_req,res) => {
     res.status(200).send(`<p>${JSON.stringify(products)}</p>`)
})

app.get("/productoRandom", (_req,res) => {
    const randomIndex = Math.floor(Math.random() * products.length);
    res.status(200).send(`<h1>Por favor ingresar a la ruta /productos ${products[randomIndex].title}</h1>`)
})