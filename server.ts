import app from "./app";
import configLoader from "./src/loaders/config.loader";

import { logger } from "./src/utils/logger/index";

import cluster from "cluster";
import os from "os";

const config = configLoader();

if (config.cpu.MODE == "cluster") {
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;

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
