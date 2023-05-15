const UserModel = require('../../models/user.model');
const MongooseConnect = require('../../../utils/mongo/connect')

const AppError = require('../../../middlewares/error.middleware');
const { logger } = require('../../../utils/logger/index')

class UserMongoRepository{
    constructor() {
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new UserMongoRepository();
            logger.info('Users Repository: Local Mongo instance created');
        }
        return this.instance
    }

    async getAll(){
        try{
            const query = await UserModel.find({});
            return query;
        } catch (err){
            throw new AppError(err.message, 'Mongo data process', 'Users Repository','getAll() error', 500 );
        }
    }

    async append(data){
        try{
            const userStage = new UserModel(data);
            return await userStage.save();
        } catch(err) {
            throw new AppError(err.message, 'Mongo data process', 'Users Repository','append() error', 500 );
        }
        
    }

    async getByCondition( fieldName = '_id' , fieldValue ){
        try{
            const query = await UserModel.findOne({ [fieldName]: fieldValue });
            return query
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process', 'Users Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async getPasswordByUserName( username ){
        try{
            const query = await UserModel.findOne({ username });
            return query.password;
        } catch(err) {
            throw new AppError(err.message, 'Mongo data process', 'Users Repository','getPasswordByUserName(username) error', 500 );
        }
    }
}

module.exports = UserMongoRepository;