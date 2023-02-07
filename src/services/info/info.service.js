const Yargs = require('yargs/yargs')
const yargs = Yargs();

const { hideBin} = require('yargs/helpers');
const argv = Yargs(hideBin(process.argv)).argv;

const numCPUs = require('os').cpus().length;

class InfoService{
    constructor(){}

    async getInfoProcess(){
        const data = {
            args: argv,
            pid: process.pid,
            platform: process.platform,
            version: process.version,
            memory: process.memoryUsage().rss,
            executionPath: process.execPath,
            projectPath: process.cwd(),
            numCPUs: numCPUs
        }
        return await data
    }
}

module.exports = InfoService;