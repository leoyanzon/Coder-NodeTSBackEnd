const CartsModel = require('../../models/cart.model');
const MongooseConnect = require('../../../services/mongo/connect');
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

    async getByCondition( fieldName = '_id' , fieldValue ){
        try{
            const query = await CartsModel.findOne({ [fieldName]: fieldValue });
            const cartDTO = await new CartDTO(query);
            return cartDTO;
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','getByCondition(fieldName, fieldValue) error', 500 );
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
}

module.exports = CartMongoRepository;