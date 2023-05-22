import pino from 'pino';
import pinoHttp from 'pino-http';
import pretty from 'pino-pretty';

import configLoader from '../../loaders/config.loader';
const config = configLoader();
console.info(config);
const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};


const stream = pretty({
    colorize: true,
    translateTime: "yyyy-dd-mm, h:MM:ss TT",
})

console.info(config.logger.LOG_LEVEL);
const logger = pino({
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: "yyyy-dd-mm, h:MM:ss TT",
        }
    }
});

const loggerHttp = pinoHttp(stream);
/*
const streams = Object.keys(levels).map((level) => {
  return {
    level: level,
    stream: stream,
  }
})

streams.push({
  level: 'info',
  stream: pino.destination({
    name:`${__dirname}/app-info.log`,
  })
});


const loggerToFile = pino({
    level: config.logger.LOG_LEVEL || 'info',
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
    
  },
  pino.multistream(streams, {
    levels,
    dedupe: true,
  })
);
*/
export { logger, loggerHttp };