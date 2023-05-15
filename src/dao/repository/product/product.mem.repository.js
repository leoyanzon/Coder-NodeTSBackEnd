const ProductDTO = require('../../dto/product.dto');
const { logger } = require('../../../utils/logger');
const { v4: uuidv4 } = require('uuid');

const AppError = require('../../../middlewares/error.middleware');

class ProductMemRepository{
    constructor(){
        this.products = [];
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new ProductMemRepository();
            logger.info('Products Repository: Memory created');
        }
        return this.instance;
    }
    async getAll(){
        try{
            return this.products;
        } catch (err){
            throw new AppError(err.message, 'Memory data process', 'Products Repository','getAll() error', 500 );
        }
    }
    async append(productData){
        try{
            const _id = uuidv4();
            const productDTO = new ProductDTO(productData);
            const newProduct = {...productDTO, _id:_id};
            this.products.push(newProduct);
            return newProduct
        } catch (err){
            throw new AppError(err.message, 'Memory data process', 'Products Repository','append() error', 500 );
        }
    }
    async getByCondition( fieldName = "_id", fieldValue ){
        try{
            const [ query ] = this.products.filter(it => it[fieldName] === fieldValue);
            if ( query == null ) {
                return false
            }
            const productDTO = new ProductDTO(query);
            return productDTO;
        } catch(err) {
            throw new AppError(err.message, 'Memory data process', 'Products Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteByCondition( fieldName = "_id", fieldValue ){
        try{
            const filteredObject = this.products.filter(it => it[fieldName] != fieldValue);
            if ( this.products  === filteredObject ) {
                return false
            }
            this.products = filteredObject;
            return true;
        } catch(err) {
            throw new AppError(err.message, 'Memory data process', 'Products Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteAll(){
        try{
            this.products = [];
            return true
        } catch(err) {
            throw new AppError(err.message, 'Memory data process', 'Products Repository','deleteAll error', 500 );
        }
    }
}

module.exports = ProductMemRepository;