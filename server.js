const app = require("./app");
const config = require("./src/loaders/config.loader")();

const { logger } = require("./src/utils/logger/index");

const cluster = require("cluster");
if (config.cpu == "CLUSTER") {
  if (cluster.isPrimary) {
    const numCPUs = require("os").cpus().length;

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      logger.warn(`worker ${worker.process.pid} died. Code: ${code}`);
    });
  } else {
    app.listen(config.server.SERVER_PORT, () => {
      logger.info(`Server: Up and running in port ${config.server.SERVER_PORT}`);
      logger.info(`Server: ${config.server.ENVIRONMENT} mode`);
    });
  }
} else {
  app.listen(config.server.SERVER_PORT, () => {
      logger.info(`Server: Up and running in port ${config.server.SERVER_PORT}`);
      logger.info(`Server: ${config.server.ENVIRONMENT} mode`);
  });
}
