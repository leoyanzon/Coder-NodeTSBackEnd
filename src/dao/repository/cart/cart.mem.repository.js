const ProductDTO = require('../../dto/product.dto');
const { logger } = require('../../../utils/logger');
const { v4: uuidv4 } = require('uuid');

class CartMemRepository{
    constructor(){
        this.cart = [];
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new CartMemRepository();
            logger.info('Cart Repository: Memory created');
        }
        return this.instance;
    }
    async getAll(){
        try{
            return this.cart;
        } catch (err){
            logger.error(`Cart Repository: getAll() error ${err.message}`)
        }
    }
    async save(cartData){
        try{
            const _id = uuidv4();
            const productDTO = await new ProductDTO(cartData);
            
            this.cart.push({...productDTO, _id:_id});
            return _id
        } catch (err){
            logger.error(`Cart Repository: save() error ${err.message}`);
        }
    }
    async getById(_id){
        try{
            const [ query ] = this.cart.filter(it => it._id === _id)
            return query;
        } catch(err) {
            logger.error(`Cart Repository: getById() error ${err.message}`);
        }
    }
    async deleteById(_id){
        try{
            this.cart = this.cart.filter(it => it._id != _id);
            return _id;
        } catch(err) {
            logger.error(`Cart Repository deleteById() error ${err.message}`);
        }
    }
    async deleteAll(){
        try{
            this.cart = [];
            return true
        } catch(err) {
            logger.error(`Cart Repository: deleteAll() error ${err.message}`);
        }
    }
}

module.exports = CartMemRepository;