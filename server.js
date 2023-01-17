const app = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.info(`Server up and running in port ${PORT}`)
})