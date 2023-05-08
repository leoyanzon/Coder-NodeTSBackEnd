const { logger } = require('../../../services/logger');
const { v4: uuidv4 } = require('uuid');
const { use } = require('chai');

class UsersMemRepository{
    constructor(){
        this.users = [];
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new UsersMemRepository();
            logger.info('Users repository created: Memory');
        }
        return this.instance
    }
    async getAll(){
        try{
            return this.users;
        } catch (err){
            console.error("no existe el archivo:", err.message)
        }
    }
    async save(userData){
        try{
            const _id = uuidv4();
            const newUser = {...userData, _id:_id};
            this.users.push(newUser);
            return newUser
        } catch (err){
            console.error("Error al guardar objeto:", err);
        }
    }
    async getUserByUserName(username){
        try{
            const [ query ] = this.users.filter(it => it.username === username)
            return query;
        } catch(err) {
            console.log("Error en la busqueda", err.message);
        }
    }
    async getUserById( _id ){
        try{
            const [ query ] = this.users.filter(it => it._id === _id)
            return query;
        } catch(err) {
            logger.error("Error en la busqueda", err.message);
        }
    }
    async deleteById(_id){
        try{
            this.users = this.users.filter(it => it._id != _id);
            return _id;
        } catch(err) {
            console.log("Error en el proceso de eliminacion", err.message);
        }
    }
    async deleteAll(){
        try{
            this.users = [];
            return true
        } catch(err) {
            console.log("Error en la eliminacion", err.message);
        }
    }

}

module.exports = UsersMemRepository;