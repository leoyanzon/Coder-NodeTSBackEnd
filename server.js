const app = require('./app');

const appLogger = require('pino')(
    {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        },
    }
);

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
            appLogger.warn(`worker ${worker.process.pid} died. Code: ${code}`);
        })
    
    } else {
        app.listen(SERVER_PORT, ()=>{
            appLogger.info(`Server up and running in port ${SERVER_PORT} in mode: ${args.mode}`);
        });
    }
} else {
    app.listen(SERVER_PORT, ()=>{
        appLogger.info(`Server up and running in port ${SERVER_PORT} in mode: ${args.mode}`);
    });
    
}


