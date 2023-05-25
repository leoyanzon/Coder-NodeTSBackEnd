import UserModel from '../../models/user.model';
import MongooseConnect from '../../../utils/mongo/connect'

import AppError from '../../../middlewares/error.middleware';
import { logger } from '../../../utils/logger/index';

import {IUserRepository, UserInterface , FullUserInterface } from '../../../interfaces/user.interfaces';

class UserMongoRepository implements IUserRepository{
    public static instance : UserMongoRepository;

    constructor() {
        MongooseConnect.getInstance();
    }

    static getInstance() : IUserRepository{
        if (!this.instance){
            this.instance = new UserMongoRepository();
            logger.info('Users Repository: Local Mongo instance created');
        }
        return this.instance
    }

    async getAll() : Promise<FullUserInterface[]>{
        try{
            const query : FullUserInterface[] = await UserModel.find({});
            return query;
        } catch (err : any){
            throw new AppError(err.message, 'Mongo data process', 'Users Repository','getAll() error', 500 );
        }
    }

    async append(data: UserInterface) : Promise<FullUserInterface>{
        try{
            const userStage : any = new UserModel(data);
            return await userStage.save();
        } catch(err: any) {
            throw new AppError(err.message, 'Mongo data process', 'Users Repository','append() error', 500 );
        }
    }

    async getByCondition( fieldName : keyof FullUserInterface = '_id' , fieldValue : string ) : Promise<FullUserInterface | null>{
        try{
            const query : FullUserInterface = await UserModel.findOne({ [fieldName]: fieldValue }).lean();
            return query
        } catch (err: any) {
            throw new AppError(err.message, 'Mongo data process', 'Users Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async getPasswordByUserName( username : string ) : Promise<string>{
        try{
            const query : any = await UserModel.findOne({ username });
            return query.password;
        } catch(err : any) {
            throw new AppError(err.message, 'Mongo data process', 'Users Repository','getPasswordByUserName(username) error', 500 );
        }
    }

    async deleteByCondition( fieldName : keyof FullUserInterface = "_id", fieldValue : string ) : Promise<boolean>{
        try{
            const query : any = await UserModel.deleteOne({ [fieldName]: fieldValue })
            return true;
        } catch(err : any) {
            throw new AppError(err.message, 'Memory data process', 'Users Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteAll() : Promise<boolean>{
        try{
            const query : any = await UserModel.deleteMany();
            return true
        } catch(err: any) {
            throw new AppError(err.message, 'Memory data process', 'Users Repository','deleteAll error', 500 );
        }
    }
}

export default UserMongoRepository;