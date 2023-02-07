const app = require('./app');

const Yargs = require('yargs/yargs')
const yargs = Yargs();

const { hideBin} = require('yargs/helpers');
const argv = Yargs(hideBin(process.argv));

const args = argv.default('port', 8080).argv;
const SERVER_PORT = args.port;

const cluster = require('cluster');

if (args.mode == 'CLUSTER'){
    if(cluster.isPrimary){
        const numCPUs = require('os').cpus().length;

        for (let i = 0 ; i < numCPUs; i++ ){
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) =>{
            console.info(`worker ${worker.process.pid} died`);
        })
    
    } else {
        app.listen(SERVER_PORT, ()=>{
            console.info(`Server up and running in port ${SERVER_PORT} in mode: ${args.mode}`)
        });
    }
} else {
    app.listen(SERVER_PORT, ()=>{
        console.info(`Server up and running in port ${SERVER_PORT} in mode: ${args.mode}`)
    });
    
}


