const httpStatus = require('http-status');

class AppError extends Error{
    constructor(message, type, context, data, statusCode){
        super(message);
        this.name = this.constructor.name;
        this.type = type;
        this.context = context;
        this.details = {
            data : data,
            statusCode : statusCode,
            codeMessage: `${httpStatus[statusCode]}`,
            timestamp : new Date()

        }
    console.info(this)
    }
}

module.exports = AppError;