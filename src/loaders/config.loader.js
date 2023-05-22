const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const Config = require('../config/config');

const getArguments = () => {
    const argv = yargs(hideBin(process.argv))
        .option('port', {
            alias: 'p',
            describe: 'Port number to listen on',
            type: 'number'
        })
        .option('mode', {
            describe: 'Application mode',
            choices: ['development', 'production', 'test'],
            default: 'development'
        })
        .option('cpu', {
            describe: 'Cpu mode',
            choices: ['cluster', 'fork'],
            default: 'fork'
        })
        .argv;
    return argv;
}

const configLoader = () => {

    const argv = getArguments();
    const config = Config.getInstance(argv);

    return config.config;
}

module.exports = configLoader;