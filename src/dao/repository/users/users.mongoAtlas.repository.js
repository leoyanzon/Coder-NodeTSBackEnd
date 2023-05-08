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

    async save(data){
        const userStage = new UserModel(data);
        return await userStage.save();
    }

    async getUserByUserName(username){
        return await UserModel.findOne({ username });
    }

    async getUserById( _id ){
        return await UserModel.findOne({ _id });
    }

    async createUser(userData){
        const userStage = new UserModel(userData);
        return await userStage.save();
    }
}

module.exports = UsersMongoAtlasRepository;