const pino = require('pino');
const pinoHttp = require('pino-http');
const pretty = require('pino-pretty');
const stream = pretty({
    colorize: true,
})

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
    }
});

const loggerHttp = pinoHttp(stream);

const loggerToFile = pino({
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: "yyyy-dd-mm, h:MM:ss TT",
    },
  },
  pino.destination("../pino-logger.log")
);

module.exports = { logger, loggerHttp };