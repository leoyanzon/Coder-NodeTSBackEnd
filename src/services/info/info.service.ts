import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv

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
        return data
    }
}

export default InfoService;