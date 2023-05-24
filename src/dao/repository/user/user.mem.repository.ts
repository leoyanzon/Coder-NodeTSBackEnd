import { logger } from '../../../utils/logger';
import { v4 as uuidv4 } from 'uuid';

import AppError from '../../../middlewares/error.middleware';

import { UserInterface } from '../../dto/user.dto';

import {IUserRepository} from '../../user.factory';

interface FullUserInterface extends UserInterface {
    _id: string,
    password: string
}

class UserMemRepository implements IUserRepository{
    public static instance: UserMemRepository;
    public users: FullUserInterface[]
    constructor(){
        this.users = [];
    }

    static getInstance() : IUserRepository{
        if (!this.instance){
            this.instance = new UserMemRepository();
            logger.info('Users Repository: Memory created');
        }
        return this.instance
    }

    async getAll() : Promise<FullUserInterface[]> {
        try{
            return this.users;
        } catch (err : any){
            throw new AppError(err.message, 'Memory data process', 'Users Repository','getAll() error', 500 );
        }
    }
    async append(userData : UserInterface) : Promise<FullUserInterface>{
        try{
            const _id : string = uuidv4();
            const newUser : FullUserInterface = {...userData, _id:_id};
            this.users.push(newUser);
            return newUser
        } catch (err : any){
            throw new AppError(err.message, 'Memory data process', 'Users Repository','append() error', 500 );
        }
    }
    async getByCondition( fieldName : keyof FullUserInterface = "_id", fieldValue : string ) : Promise<FullUserInterface | null>{
        try{
            const query : FullUserInterface[] = this.users.filter(it => it[fieldName] === fieldValue);
            if ( query?.length > 0 ) {
                return null;
            }
            return query[0]
        } catch(err: any) {
            throw new AppError(err.message, 'Memory data process', 'Users Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async getPasswordByUserName( username : string ) : Promise<string>{
        try{
            const query : FullUserInterface[] = this.users.filter(it => it.username === username);
            if ( query?.length > 0 ) {
                return ""
            }
            return query[0].password;
        } catch(err : any) {
            throw new AppError(err.message, 'Memory data process', 'Users Repository','getPasswordByUserName(username) error', 500 );
        }
    }

    async deleteByCondition( fieldName : keyof FullUserInterface = "_id", fieldValue : string ) : Promise<boolean>{
        try{
            const filteredObject : FullUserInterface[] = this.users.filter(it => it[fieldName] != fieldValue); 
            if ( this.users  === filteredObject ) {
                return false
            }
            this.users = filteredObject;
            return true;
        } catch(err : any) {
            throw new AppError(err.message, 'Memory data process', 'Users Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteAll() : Promise<boolean>{
        try{
            this.users = [];
            return true
        } catch(err: any) {
            throw new AppError(err.message, 'Memory data process', 'Users Repository','deleteAll error', 500 );
        }
    }
}

export default UserMemRepository;