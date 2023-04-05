const app = require("./app");
const config = require("./src/config/config");

const { logger } = require("./src/services/logger/index");

const Yargs = require("yargs/yargs");
const yargs = Yargs();

const { hideBin } = require("yargs/helpers");
const argv = Yargs(hideBin(process.argv));

const args = argv.default("port", config.server.SERVER_PORT).argv;
const SERVER_PORT = args.port;

const cluster = require("cluster");
if (args.mode == "CLUSTER") {
  if (cluster.isPrimary) {
    const numCPUs = require("os").cpus().length;

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      logger.warn(`worker ${worker.process.pid} died. Code: ${code}`);
    });
  } else {
    app.listen(SERVER_PORT, () => {
      logger.info(
        `Server up and running in port ${SERVER_PORT} in mode: ${args.mode}`
      );
    });
  }
} else {
  app.listen(SERVER_PORT, () => {
    logger.info(
      `Server up and running in port ${SERVER_PORT} in mode: ${args.mode}`
    );
  });
}
