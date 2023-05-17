const httpStatus = require('http-status');

const { logger } = require('../utils/logger/index');

class AppError extends Error{
    constructor(origin, type, context, message, statusCode){
        super(origin);
        this.errorList = []
        this.errorList.push({
            name : this.constructor.name,
            origin: origin,
            message: message,
            type : type,
            context : context,
            statusCode : statusCode,
            codeMessage: `${httpStatus[statusCode]}`,
            timestamp : new Date().toISOString()
        })
        logger.error(this.message);
    }
}

module.exports = AppError;