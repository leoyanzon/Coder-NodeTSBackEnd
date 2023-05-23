import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import Config from '../config/config';
import { ConfigObject } from '../config/config';

const getArguments = (): any => {
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

const configLoader = () : ConfigObject => {

    const argv = getArguments();
    const configInstance = Config.getInstance(argv);

    return configInstance.config;
}

export default configLoader;