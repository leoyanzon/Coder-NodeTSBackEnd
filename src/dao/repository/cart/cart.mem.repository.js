const { logger } = require('../../../utils/logger');
const { v4: uuidv4 } = require('uuid');

const CartDTO = require('../../dto/cart.dto');

const AppError = require('../../../middlewares/error.middleware');
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
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','getAll() error', 500 );
        }
    }
    async append(cartData){
        try{
            const _id = uuidv4();
            const cartDTO = await new CartDTO(cartData);
            const newCart = {...cartDTO, _id:_id};
            this.cart.push(newCart);
            return newCart
        } catch (err){
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','append() error', 500 );
        }
    }
    async update(cartData){
        try{
            this.cart.map(item => {
                if (item._id == cartData._id){
                    item = cartData;
                }
                return item
            })
            return true
        } catch (err){
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','update(cartData) error', 500 );
        }
    }
    async getLastCart(userId){
        try{
            const query = this.cart.filter(it => (it.userId === userId && it.completed == false));
            if ( !query.length ){
                return false
            } 
            return query[ query.length - 1 ];
        } catch(err) {
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','getLastCart(userId) error', 500 );
        }
    }
    async getByCondition( fieldName = "_id", fieldValue ){
        try{
            const [ query ] = this.cart.filter(it => it[fieldName] === fieldValue);
            if ( query == null ) {
                return false
            }
            const cartDTO = new CartDTO(query);
            return cartDTO;
        } catch(err) {
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteByCondition( fieldName = "_id", fieldValue ){
        try{
            const filteredObject = this.cart.filter(it => it[fieldName] != fieldValue);
            if ( this.cart  === filteredObject ) {
                return false
            }
            this.cart = filteredObject;
            return true;
        } catch(err) {
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteAll(){
        try{
            this.cart = [];
            return true
        } catch(err) {
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','deleteAll error', 500 );
        }
    }
}

module.exports = CartMemRepository;