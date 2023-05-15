const CartsModel = require('../../models/cart.model');
const MongooseConnect = require('../../../services/mongo/connect');
const { logger } = require('../../../utils/logger');

const CartDTO = require('../../dto/cart.dto');

const AppError = require('../../../middlewares/error.middleware');

class CartsMongoAtlasRepository{
    constructor() {
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new CartsMongoAtlasRepository();
            logger.info('Carts Repository: Mongo Atlas instance created');
        }
        return this.instance
    }

    async getAll(){
        try{
            const query = await CartsModel.findOne({});
            const cartDTO = await new CartDTO(query);
            return cartDTO;
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

    async getByCondition( _ , condition ){
        try{
            const query = await CartsModel.findOne({ condition });
            const CartDTO = await new CartDTO(query);
            return CartDTO;
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }
}

module.exports = CartsMongoRepository;