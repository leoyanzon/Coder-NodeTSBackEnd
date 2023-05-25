import UserMemRepository from './repository/user/user.mem.repository';
import UserFileRepository from './repository/user/user.file.repository';
import UserMongoRepository from './repository/user/user.mongo.repository';

import configLoader from '../loaders/config.loader';
const config = configLoader();

import { IUserRepository } from '../interfaces/user.interfaces';



export default class UserFactory{
    static getInstance() : IUserRepository {
        const db = config.db.DATA_STORAGE;
        if( db === 'MONGO_ATLAS' || db === 'MONGO_DB' ) return UserMongoRepository.getInstance();
        if( db === 'FILE' ) return UserFileRepository.getInstance('Users');
        return UserMemRepository.getInstance();
    }
}
