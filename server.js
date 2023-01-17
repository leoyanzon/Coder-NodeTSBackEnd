const app = require('./app');

const SERVER_PORT = process.env.SERVER_PORT || 8080;

app.listen(SERVER_PORT, ()=>{
    console.info(`Server up and running in port ${SERVER_PORT}`)
})