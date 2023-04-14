const UserModel = require('../../models/user.model');
const MongooseConnect = require('../../../services/mongo/connect')

class UsersMongoAtlasRepository{
    constructor(){
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new UsersMongoAtlasRepository()
        }
        return this.instance
    }

    async getUserByCondition(condition){
        return await UserModel.findOne(condition);
    }

    async createUser(userData){
        const userStage = new UserModel(userData);
        return await userStage.save();
    }
}

module.exports = UsersMongoAtlasRepository;