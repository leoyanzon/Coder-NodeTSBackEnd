const { logger } = require('../../../services/logger');
const { v4: uuidv4 } = require('uuid');

const UserDTO = require('../../dto/user.dto');

class UsersMemRepository{
    constructor(){
        this.users = [];
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new UsersMemRepository();
            logger.info('Users Repository: Memory created');
        }
        return this.instance
    }
    async getAll(){
        try{
            return this.users;
        } catch (err){
            logger.error(`Users Repository: getAll() error ${err.message}`)
        }
    }
    async save(userData){
        try{
            const _id = uuidv4();
            const newUser = {...userData, _id:_id};
            this.users.push(newUser);
            return newUser
        } catch (err){
            logger.error(`Users Repository: save() error ${err.message}`);
        }
    }
    async getUserByUserName( username ){
        try{
            const [ query ] = this.users.filter(it => it.username === username);
            return query;
        } catch(err) {
            logger.error(`Users Repository: getUserByUserName() error ${err.message}`);
        }
    }
    async getPasswordByUserName( username ){
        try{
            const [ query ] = this.users.filter(it => it.username === username);
            return query.password;
        } catch(err) {
            logger.error(`Users Repository: getPasswordByUserName() error ${err.message}`);
        }
    }
    async getUserById( _id ){
        try{
            const [ query ] = this.users.filter(it => it._id === _id)
            const userDTO = await new UserDTO(query);
            return userDTO;
        } catch(err) {
            logger.error(`Users Repository: getUserById() error ${err.message}`);
        }
    }
    async deleteById(_id){
        try{
            this.users = this.users.filter(it => it._id != _id);
            return _id;
        } catch(err) {
            logger.error(`Users Repository deleteById() error ${err.message}`);
        }
    }
    async deleteAll(){
        try{
            this.users = [];
            return true
        } catch(err) {
            logger.error(`Users Repository: deleteAll() error ${err.message}`);
        }
    }

}

module.exports = UsersMemRepository;