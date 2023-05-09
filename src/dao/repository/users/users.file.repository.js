const { logger } = require('../../../services/logger');
const { v4: uuidv4 } = require('uuid');

const UserDTO = require('../../dto/user.dto');

const fs = require('fs');

class UsersFileRepository {
    constructor(_nombreArchivo){
        
        this.ruta = `./${_nombreArchivo}.txt`;
        this.foldername = 'temp';
        //this.createDirectory();
        this.createFile();
    }

    static getInstance(_nombreArchivo){
        if (!this.instance){
            this.instance = new UsersFileRepository(_nombreArchivo);
            logger.info(`Users Repository: File ${this.instance.ruta} used`);
        }
        return this.instance
    }

    async createFile(){
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
    
    async createDirectory(){
        try{
            fs.mkdirSync(path.join(__dirname, this.folderName), { recursive: true });
            logger.info(`Users Repository: Folder ${this.folderName} created`)
        } catch(err) {
            logger.error(`Users Repository: Error creating directory ${err.message}`)
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
            logger.error(`Users Repository: getAll() error ${err.message}`);
        }
    }
    async save(userData){
        try{
            const objetosExistentes = await this.getAll();
            const _id = uuidv4();

            const newUser = {...userData, _id: _id};
            objetosExistentes.push(newUser);

            const data = JSON.stringify(objetosExistentes);
            await fs.promises.writeFile(this.ruta, data)
            return newUser
        } catch (err){
            logger.error(`Users Repository: save() error ${err.message}`);
        }
    }
    async getUserByUserName( username ){
        try{
            const objetosExistentes = await this.getAll();
            const [ query ] = objetosExistentes.filter(it => it.username === username);
            return query;
        } catch(err) {
            logger.error(`Users Repository: getUserByUserName() error ${err.message}`);
        }
    }
    async getPasswordByUserName( username ){
        try{
            const objetosExistentes = await this.getAll();
            const [ query ] = objetosExistentes.filter(it => it.username === username);
            return query.password;
        } catch(err) {
            logger.error(`Users Repository: getPasswordByUserName() error ${err.message}`);
        }
    }
    async getUserById( _id ){
        try{
            const objetosExistentes = await this.getAll();
            const [ query ] = objetosExistentes.filter(it => it._id === _id)
            const userDTO = await new UserDTO(query);
            return userDTO;
        } catch(err) {
            logger.error(`Users Repository: getUserById() error ${err.message}`);
        }
    }
    async deleteById(_id){
        try{
            const objetosExistentes = await this.getAll();
            const data = JSON.stringify(objetosExistentes.filter(it => it._id != _id));
            await fs.promises.writeFile(this.ruta, data);
            return _id;
        } catch(err) {
            logger.error(`Users Repository: deleteById() error ${err.message}`);
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.ruta, "");
            return true
        } catch(err) {
            logger.error(`Users Repository: deleteAll() error ${err.message}`);
        }
    }
}

module.exports = UsersFileRepository;