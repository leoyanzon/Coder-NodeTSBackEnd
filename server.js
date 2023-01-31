const app = require('./app');

const Yargs = require('yargs/yargs')
const yargs = Yargs();

const { hideBin} = require('yargs/helpers');
const argv = Yargs(hideBin(process.argv)).argv;

const args = yargs.default('port',8080).argv;
const SERVER_PORT = args.port;

app.listen(SERVER_PORT, ()=>{
    console.info(`Server up and running in port ${SERVER_PORT}`)
})