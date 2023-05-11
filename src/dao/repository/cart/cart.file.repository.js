const path = require('path');
const { logger } = require('../../../services/logger');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
const CartDTO = require('../../dto/cart.dto');
const createFolder = require('../../../utils/folders.utils');

class CartFileRepository {
    constructor(_nombreArchivo){
        this.folderName = 'public/db/';
        this.fileName = `${_nombreArchivo}.txt`;
        this.ruta = this.folderName + this.fileName;
        this.createFile();
    }

    static getInstance(_nombreArchivo){
        if (!this.instance){
            this.instance = new CartFileRepository(_nombreArchivo);
            logger.info(`Cart Repository: File ${this.instance.ruta} used`);
        }

        return this.instance
    }

    async createFile(){
        await createFolder(this.folderName, this.fileName);
        try{
            const exists = fs.existsSync(this.ruta);
            if (!exists) {
                await fs.promises.writeFile(this.ruta, "");
                logger.info(`Cart Repository: File ${this.ruta} created`)
            }
        } catch (err) {
            logger.error(`Cart Repository: Error creating file:${err.message}`)
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
            logger.error(`Cart Repository: getAll() error:${err.message}`);
        }
    }
    async save(cartData){
        try{
            const objetosExistentes = await this.getAll();
            const _id = uuidv4();
            const cartDTO = await new CartDTO(cartData);

            objetosExistentes.push({...cartDTO, _id:_id});
            const data = JSON.stringify(objetosExistentes);
            await fs.promises.writeFile(this.ruta, data)
            return _id
        } catch (err){
            logger.error(`Cart Repository: save() error:${err.message}`);
        }
    }

    async update(cartData){
        try{
            const objetosExistentes = await this.getAll();
            
            const newObject = objetosExistentes.map(item => {
                if (item._id == cartData._id){
                    item = cartData;
                }
                return item
            })

            const data = JSON.stringify(newObject);
            await fs.promises.writeFile(this.ruta, data)
            return true
        } catch (err){
            logger.error(`Cart Repository: update() error:${err.message}`);
            return false
        }
    }

    async getLastCart(userId){
        try{
            const objetosExistentes = await this.getAll();
            const query = objetosExistentes.filter(it => (it.userId === userId && it.completed == false));
            if (query.length > 0) return query[ query.length - 1 ];
            return undefined;
        } catch(err) {
            logger.error(`Cart Repository: getById() error ${err.message}`);
        }
    }

    async getById(_id){
        try{
            const objetosExistentes = await this.getAll();
            const [ query ] = objetosExistentes.filter(it => it._id === _id)
            return query;
        } catch(err) {
            logger.error(`Cart Repository: getById() error ${err.message}`);
        }
    }
    async deleteById(_id){
        try{
            const objetosExistentes = await this.getAll();
            const data = JSON.stringify(objetosExistentes.filter(it => it._id != _id));
            await fs.promises.writeFile(this.ruta, data);
            return _id;
        } catch(err) {
            logger.error(`Cart Repository: deleteById() error ${err.message}`);
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.ruta, "");
            return true
        } catch(err) {
            logger.error(`Cart Repository: deleteAll() error ${err.message}`);
        }
    }
}

module.exports = CartFileRepository;