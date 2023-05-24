import UserMemRepository from './repository/user/user.mem.repository';
import UserFileRepository from './repository/user/user.file.repository';
import UserMongoRepository from './repository/user/user.mongo.repository';

import configLoader from '../loaders/config.loader';
const config = configLoader();

import { UserInterface, FullUserInterface } from './dto/user.dto';

export interface IUserRepository{
    getAll() : Promise<FullUserInterface[]>;
    append(userData : UserInterface) : Promise<FullUserInterface>;
    getByCondition( fieldName : keyof FullUserInterface, fieldValue : string ) : Promise<FullUserInterface | null>;
    getPasswordByUserName( username : string) : Promise<string>;
    deleteByCondition( fieldName : keyof FullUserInterface, fieldValue : string) : Promise<boolean>;
    deleteAll() : Promise<boolean>;
}

export default class UserFactory{
    static getInstance() : IUserRepository {
        const db = config.db.DATA_STORAGE;
        if( db === 'MONGO_ATLAS' || db === 'MONGO_DB' ) return UserMongoRepository.getInstance();
        if( db === 'FILE' ) return UserFileRepository.getInstance('Users');
        return UserMemRepository.getInstance();
    }
}
