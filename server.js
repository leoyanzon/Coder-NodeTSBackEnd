//Express app
const { app , http, io} = require("./app");

//ENV
const PORT = process.env.PORT || 8080;

//DB
//const { Contenedor } = require("./desafio2");

const server = http.listen(PORT, ()=>{
    console.log(`Server up and running on port: ${server.address().port}`)
})

app.get("/health", (_req,res) =>{
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || "undefined",
        health: "up"
    })
})

