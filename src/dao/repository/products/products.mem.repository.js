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
            logger.info('Products Repository: Memory created');
        }
        return this.instance;
    }
    async getAll(){
        try{
            return this.products;
        } catch (err){
            logger.error(`Products Repository: getAll() error ${err.message}`)
        }
    }
    async save(productData){
        try{
            const _id = uuidv4();
            const productDTO = await new ProductDTO(productData);
            
            this.products.push({...productDTO, _id:_id});
            return _id
        } catch (err){
            logger.error(`Products Repository: save() error ${err.message}`);
        }
    }
    async getById(_id){
        try{
            const [ query ] = this.products.filter(it => it._id === _id)
            return query;
        } catch(err) {
            logger.error(`Products Repository: getById() error ${err.message}`);
        }
    }
    async deleteById(_id){
        try{
            this.products = this.products.filter(it => it._id != _id);
            return _id;
        } catch(err) {
            logger.error(`Products Repository deleteById() error ${err.message}`);
        }
    }
    async deleteAll(){
        try{
            this.products = [];
            return true
        } catch(err) {
            logger.error(`Products Repository: deleteAll() error ${err.message}`);
        }
    }
}

module.exports = ProductsMemRepository;