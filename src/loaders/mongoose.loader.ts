import { Express } from 'express';
import MongooseConnect from '../utils/mongo/connect';

const mongooseLoader = async( app : Express ) : Promise<Express> => {

    await MongooseConnect.getInstance();
    
    return app;
}

module.exports = mongooseLoader;