const httpStatus = require('http-status');

const { logger } = require('../utils/logger/index');

class AppError extends Error{
    constructor(message, type, context, data, statusCode){
        super(message);
        this.errorList = []
        this.errorList.push({
            name : this.constructor.name,
            message: message,
            type : type,
            context : context,
            data : data,
            statusCode : statusCode,
            codeMessage: `${httpStatus[statusCode]}`,
            timestamp : new Date()
        })
        logger.error(this.message);
    }
}

module.exports = AppError;