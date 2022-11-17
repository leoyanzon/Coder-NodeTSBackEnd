//Express http from app
const { http } = require("./app");

//ENV
const PORT = process.env.PORT || 8080;

const server = http.listen(PORT, ()=>{
    console.log(`Server up and running on port: ${server.address().port}`)
})

