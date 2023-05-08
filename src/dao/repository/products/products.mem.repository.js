const ProductDTO = require('../../dto/product.dto');
const { logger } = require('../../../services/logger');
const { v4: uuidv4 } = require('uuid');

class ProductsMemRepository{
    constructor(){
        this.products = [];
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new ProductsMemRepository();
            logger.info('Products repository created: Memory');
        }
        return this.instance;
    }
    async getAll(){
        try{
            return this.products;
        } catch (err){
            console.error("no existe el archivo:", err.message)
        }
    }
    async save(productData){
        try{
            const _id = uuidv4();
            const productDTO = await new ProductDTO(productData);
            
            this.products.push({...productDTO, _id:_id});
            return _id
        } catch (err){
            console.error("Error al guardar objeto:", err);
        }
    }
    async getById(_id){
        try{
            const [ query ] = this.products.filter(it => it._id === _id)
            return query;
        } catch(err) {
            console.log("Error en la busqueda", err.message);
        }
    }
    async deleteById(_id){
        try{
            this.products = this.products.filter(it => it._id != _id);
            return _id;
        } catch(err) {
            console.log("Error en el proceso de eliminacion", err.message);
        }
    }
    async deleteAll(){
        try{
            this.products = [];
            return true
        } catch(err) {
            console.log("Error en la eliminacion", err.message);
        }
    }
}

module.exports = ProductsMemRepository;