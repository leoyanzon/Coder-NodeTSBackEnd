const { logger } = require('../../../services/logger');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

class UsersFileRepository {
    constructor(_nombreArchivo){
        this.ruta = `./temp/${_nombreArchivo}.txt`
        this.createFile();
    }

    static getInstance(_nombreArchivo){
        if (!this.instance){
            this.instance = new UsersFileRepository(_nombreArchivo);
            logger.info(`Users repository created: File ${this.instance.ruta}`);
        }
        
        return this.instance
    }

    async createFile(){
        try{
            await fs.promises.writeFile(this.ruta, "");
        } catch (err) {
            console.log("Error al crear archivo", err.message);
        }
    }
    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8');
            if (contenido == ""){
                let data = []
                return data;
            } else {
                let data = JSON.parse(contenido);
                return data;
            }
        } catch (err){
            console.error("no existe el archivo:", err.message)
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
            console.error("Error al guardar objeto:", err);
        }
    }
    async getUserByUserName( username ){
        try{
            const objetosExistentes = await this.getAll();
            const [ query ] = objetosExistentes.filter(it => it.username === username)
            return query;
        } catch(err) {
            logger.error("Error en la busqueda", err.message);
        }
    }
    async getUserById( _id ){
        try{
            const objetosExistentes = await this.getAll();
            const [ query ] = objetosExistentes.filter(it => it._id === _id)
            return query;
        } catch(err) {
            logger.error("Error en la busqueda", err.message);
        }
    }
    async deleteById(_id){
        try{
            const objetosExistentes = await this.getAll();
            const data = JSON.stringify(objetosExistentes.filter(it => it._id != _id));
            await fs.promises.writeFile(this.ruta, data);
            return _id;
        } catch(err) {
            console.log("Error en el proceso de eliminacion", err.message);
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.ruta, "");
            return true
        } catch(err) {
            console.log("Error en la eliminacion", err.message);
        }
    }
}

module.exports = UsersFileRepository;