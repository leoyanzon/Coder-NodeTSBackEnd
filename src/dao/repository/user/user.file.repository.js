const { logger } = require('../../../utils/logger');
const { v4: uuidv4 } = require('uuid');

const UserDTO = require('../../dto/user.dto');

const fs = require('fs');
const createFolder = require('../../../utils/fs/folders.utils');

const AppError = require('../../../middlewares/error.middleware');

class UserFileRepository {
    constructor(_nombreArchivo){
        this.folderName = 'tmp/db/';
        this.fileName = `${_nombreArchivo}.txt`;
        this.ruta = this.folderName + this.fileName;
        this.createFile();
    }

    static getInstance(_nombreArchivo){
        if (!this.instance){
            this.instance = new UserFileRepository(_nombreArchivo);
            logger.info(`Users Repository: File ${this.instance.ruta} used`);
        }
        return this.instance
    }

    async createFile(){
        await createFolder(this.folderName, this.fileName);
        try{
            const exists = fs.existsSync(this.ruta);
            if (!exists) {
                await fs.promises.writeFile(this.ruta, "");
                logger.info(`Users Repository: File ${this.ruta} created`)
            }
        } catch (err) {
            logger.error("Users Repository: Error creating file", err.message);
        }
    }
    
    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8');
            if (contenido == ""){
                let data = []
                return data;
            }
            const data = JSON.parse(contenido);
            return data;
        } catch (err){
            throw new AppError(err.message, 'File data process', 'Users Repository','getAll() error', 500 );
        }
    }

    async append(userData){
        try{
            const objetosExistentes = await this.getAll();
            const _id = uuidv4();

            const newUser = {...userData, _id: _id};
            objetosExistentes.push(newUser);

            const data = JSON.stringify(objetosExistentes);
            await fs.promises.writeFile(this.ruta, data)
            return newUser
        } catch (err){
            throw new AppError(err.message, 'File data process', 'Users Repository','append(userData) error', 500 );
        }
    }
    async getByCondition( fieldName = "_id", fieldValue ){
        try{
            const objetosExistentes = await this.getAll();
            const [ query ] = objetosExistentes.filter(it => it[fieldName] === fieldValue);
            if ( query == null ) {
                return false
            }
            return query;
        } catch(err) {
            throw new AppError(err.message, 'File data process', 'Users Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async getPasswordByUserName( username ){
        try{
            const objetosExistentes = await this.getAll();
            const [ query ] = objetosExistentes.filter(it => it.username === username);
            if ( query == null ) {
                return false
            }
            return query.password;
        } catch(err) {
            throw new AppError(err.message, 'File data process', 'Users Repository','getPasswordByUserName(username) error', 500 );
        }
    }

    async deleteByCondition( fieldName = "_id", fieldValue ){
        try{
            const objetosExistentes = await this.getAll();           
            const filteredObject = objetosExistentes.filter(it => it[fieldName] != fieldValue);
            
            if ( objetosExistentes === filteredObject ) {
                return false
            }
            const data = JSON.stringify(filteredObject);
            await fs.promises.writeFile(this.ruta, data);
            return true;
        } catch(err) {
            throw new AppError(err.message, 'File data process', 'Users Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.ruta, "");
            return true
        } catch(err) {
            throw new AppError(err.message, 'File data process', 'Users Repository','deleteAll error', 500 );
        }
    }
}

module.exports = UserFileRepository;