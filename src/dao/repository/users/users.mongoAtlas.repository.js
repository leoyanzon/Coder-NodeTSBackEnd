const UserModel = require('../../models/user.model');
const MongooseConnect = require('../../../services/mongo/connect')

const UserDTO = require('../../dto/user.dto');

class UsersMongoAtlasRepository{
    constructor(){
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new UsersMongoAtlasRepository();
            logger.info('Users Repository: Mongo Atlas instance created');
        }
        return this.instance
    }

    async save(data){
        const userStage = new UserModel(data);
        return await userStage.save();
    }

    async getUserByUserName(username){
        const query = await UserModel.findOne({ username });
        const userDTO = await new UserDTO(query);
        return userDTO;
    }

    async getUserById( _id ){
        const query = await UserModel.findOne({ _id });
        const userDTO = await new UserDTO(query);
        return userDTO;
    }
}

module.exports = UsersMongoAtlasRepository;