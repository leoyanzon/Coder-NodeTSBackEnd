const { logger } = require('../../../utils/logger');
const { v4: uuidv4 } = require('uuid');

const CartDTO = require('../../dto/cart.dto');

const fs = require('fs');
const createFolder = require('../../../utils/fs/folders.utils');

const AppError = require('../../../middlewares/error.middleware');
class CartFileRepository {
    constructor(_nombreArchivo){
        this.folderName = 'tmp/db/';
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
            } 
            const data = JSON.parse(contenido);
            return data;
        } catch (err){
            throw new AppError(err.message, 'File data process', 'Carts Repository','getAll() error', 500 );
        }
    }
    async append(cartData){
        try{
            const objetosExistentes = await this.getAll();
            const _id = uuidv4();
            
            const cartDTO = new CartDTO(cartData);
            const newCart = {...cartDTO, _id:_id};
            objetosExistentes.push(newCart);

            const data = JSON.stringify(objetosExistentes);
            await fs.promises.writeFile(this.ruta, data)
            return newCart
        } catch (err){
            throw new AppError(err.message, 'File data process', 'Carts Repository','append() error', 500 );
        }
    }

    async update(cartData){
        try{
            const objetosExistentes = await this.getAll();
            
            const updatedCart = objetosExistentes.map(item => {
                if (item._id == cartData._id){
                    item = cartData;
                }
                return item
            })
            const data = JSON.stringify(updatedCart);
            await fs.promises.writeFile(this.ruta, data)
            return true
        } catch (err){
            throw new AppError(err.message, 'File data process', 'Carts Repository','update(cartData) error', 500 );
        }
    }

    async getLastCart(userId){
        try{
            const objetosExistentes = await this.getAll();
            const query = objetosExistentes.filter(it => (it.userId === userId && it.completed == false));
            if ( !query.length ) {
                return false;
            }
            return query[ query.length - 1 ];
        } catch(err) {
            throw new AppError(err.message, 'File data process', 'Carts Repository','getLastCart(userId) error', 500 );
        }
    }

    async getByCondition( fieldName = "_id", fieldValue ){
        try{
            const objetosExistentes = await this.getAll();
            const [ query ] = objetosExistentes.filter(it => it[fieldName] === fieldValue);
            if ( query == null ) {
                return false
            }
            const cartDTO = new CartDTO(query);
            return cartDTO;
        } catch(err) {
            throw new AppError(err.message, 'File data process', 'Carts Repository','getByCondition(fieldName, fieldValue) error', 500 );
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
            throw new AppError(err.message, 'File data process', 'Carts Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.ruta, "");
            return true
        } catch(err) {
            throw new AppError(err.message, 'File data process', 'Carts Repository','deleteAll error', 500 );
        }
    }
}

module.exports = CartFileRepository;