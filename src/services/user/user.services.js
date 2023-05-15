const { UserFactory } = require('../../dao/factory');

const EncryptService = require('../../utils/encrypt/encrypt.service');
const encryptService = new EncryptService();

const AppError = require('../../middlewares/error.middleware');

class UserServices{
    constructor(){
        this.userFactory = UserFactory.getInstance();
    }

    getAll = async() =>{
        try {
            const data = await this.userFactory.getAll();
            return data;
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Users Services','getAll error', 500 );
        }
    }
    getById = async( _id ) => {
        try{
            const data = await this.userFactory.getByCondition('_id', _id);
            return data
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Users Services','getByCondition error', 500 );
        }
    }
    getByUserName = async( username ) => {
        try{
            const data = await this.userFactory.getByCondition('username', username);
            return data
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Users Services','getByCondition error', 500 );
        }
    }

    userExists = async( username ) => {
        try{
            const data = await this.userFactory.getByCondition('username', username);
            return data
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Users Services','userExists error', 500 );
        }
    }
    passwordCheck = async( username, password ) => {
        try{
            const data = await this.userFactory.getPasswordByUserName(username);
            if (!data)  return false;
            const passwordChecked = await encryptService.checkPassword('argon2', password, data);
            if (!passwordChecked) return false
            return true
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Users Services','passwordCheck error', 500 );
        }
    }
    append = async(userData) =>{
        try {
            const hashedPassword = await encryptService.hashPassword('argon2', userData.password);
            userData.password = hashedPassword;
            const newUser = {...userData};
            const data = await this.userFactory.append(newUser);
            return data
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Users Services','append error', 500 );
        }
    }
    deleteById = async( _id ) =>{
        try {
            const data = await this.userFactory.deleteByCondition('_id', _id);
            return data
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Users Services','deleteById error', 500 );
        }
    }
}

module.exports = UserServices;