import httpStatus from 'http-status';

import { logger } from '../utils/logger/index';

import { ErrorInterface } from '../interfaces/error.interfaces';

export default class AppError extends Error{
    public errorList : ErrorInterface[];
    constructor(origin : string, type : string, context : string, message : string , statusCode : number){

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
