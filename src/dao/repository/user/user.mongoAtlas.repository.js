const UserModel = require('../../models/user.model');
const MongooseConnect = require('../../../services/mongo/connect')

const UserDTO = require('../../dto/user.dto');
const AppError = require('../../../middlewares/error.middleware');

class UserMongoAtlasRepository{
    constructor(){
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new UserMongoAtlasRepository();
            logger.info('Users Repository: Mongo Atlas instance created');
        }
        return this.instance
    }

    async getAll(){
        try{
            const query = await UserModel.find({});
            return query;
        } catch (err){
            throw new AppError(err.message, 'Mongo Atlas data process', 'Users Repository','getAll() error', 500 );
        }
    }

    async append(data){
        try{
            const userStage = new UserModel(data);
            return await userStage.save();
        } catch(err) {
            throw new AppError(err.message, 'Mongo Atlas data process', 'Users Repository','append() error', 500 );
        }
        
    }

    async getByCondition( _ , condition ){
        try{
            const query = await UserModel.findOne({ condition });
            return query
        } catch (err) {
            throw new AppError(err.message, 'Mongo Atlas data process', 'Users Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async getPasswordByUserName( username ){
        try{
            const query = await UserModel.findOne({ username });
            return query.password;
        } catch(err) {
            throw new AppError(err.message, 'Mongo Atlas data process', 'Users Repository','getPasswordByUserName(username) error', 500 );
        }
    }
}

module.exports = UserMongoAtlasRepository;