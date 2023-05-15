const { logger } = require('../../../utils/logger');
const { v4: uuidv4 } = require('uuid');

const UserDTO = require('../../dto/user.dto');

const AppError = require('../../../middlewares/error.middleware');

class UserMemRepository{
    constructor(){
        this.users = [];
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new UserMemRepository();
            logger.info('Users Repository: Memory created');
        }
        return this.instance
    }
    async getAll(){
        try{
            return this.users;
        } catch (err){
            throw new AppError(err.message, 'Memory data process', 'Users Repository','getAll() error', 500 );
        }
    }
    async append(userData){
        try{
            const _id = uuidv4();
            const newUser = {...userData, _id:_id};
            this.users.push(newUser);
            return newUser
        } catch (err){
            throw new AppError(err.message, 'Memory data process', 'Users Repository','append() error', 500 );
        }
    }
    async getByCondition( fieldName = "_id", fieldValue ){
        try{
            const [ query ] = this.users.filter(it => it[fieldName] === fieldValue);
            if ( query == null ) {
                return false
            }
            return query
        } catch(err) {
            throw new AppError(err.message, 'Memory data process', 'Users Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async getPasswordByUserName( username ){
        try{
            const [ query ] = this.users.filter(it => it.username === username);
            if ( query == null ) {
                return false
            }
            return query.password;
        } catch(err) {
            throw new AppError(err.message, 'Memory data process', 'Users Repository','getPasswordByUserName(username) error', 500 );
        }
    }

    async deleteByCondition( fieldName = "_id", fieldValue ){
        try{
            const filteredObject = this.users.filter(it => it[fieldName] != fieldValue); 
            if ( this.users  === filteredObject ) {
                return false
            }
            this.users = filteredObject;
            return true;
        } catch(err) {
            throw new AppError(err.message, 'Memory data process', 'Users Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteAll(){
        try{
            this.users = [];
            return true
        } catch(err) {
            throw new AppError(err.message, 'Memory data process', 'Users Repository','deleteAll error', 500 );
        }
    }
}

module.exports = UserMemRepository;