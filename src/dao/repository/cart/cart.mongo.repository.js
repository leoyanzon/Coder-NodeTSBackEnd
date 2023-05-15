const CartsModel = require('../../models/cart.model');
const MongooseConnect = require('../../../utils/mongo/connect');
const CartDTO = require('../../dto/cart.dto');

const { logger } = require('../../../utils/logger');

const AppError = require('../../../middlewares/error.middleware');

class CartMongoRepository{
    constructor() {
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new CartMongoRepository();
            logger.info('Carts Repository: Local Mongo instance created');
        }
        return this.instance
    }

    async getAll(){
        try{
            const query = await CartsModel.find({});
            return query;
        } catch (err){
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','getAll() error', 500 );
        }
    }

    async append(data){
        try{
            const CartStage = new CartsModel(data);
            return await CartStage.save();
        } catch(err) {
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','append() error', 500 );
        }
        
    }

    async update(cartData){
        try{
            const filter = { _id: cartData._id };
            const updatedCart = await CartsModel.findOneAndUpdate(filter, cartData, { new: true })
            
            if(!updatedCart){
                return false
            }
            return this.update
        } catch (err){
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','update(cartData) error', 500 );
        }
    }

    async getLastCart( userId ){
        try{
            const query = await CartsModel.findOne({ ["userId"]: userId, ["completed"]:false });
            const cartDTO = await new CartDTO(query);
            return cartDTO;
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async getByCondition( fieldName = '_id' , fieldValue ){
        try{
            const query = await CartsModel.findOne({ [fieldName]: fieldValue });
            const cartDTO = await new CartDTO(query);
            return cartDTO;
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async deleteByCondition( fieldName = "_id", fieldValue ){
        try{
            const filter = { [fieldName]: fieldValue };
            const deletedCart = await CartsModel.findOneAndDelete(filter);
            
            if(!deletedCart){
                return false
            }
            return deletedCart
        } catch (err){
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','deleteByCondition(fieldName,fieldValue) error', 500 );
        }
    }

    async deleteAll(){
        try{
            const deletedCart = await CartsModel.deleteMany();
            
            if(!deletedCart.deletedCount === 0){
                return false
            }
            return deletedCart
        } catch(err) {
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','deleteAll() error', 500 );
        }
    }   
}

module.exports = CartMongoRepository;