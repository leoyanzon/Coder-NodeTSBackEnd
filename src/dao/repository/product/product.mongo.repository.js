const ProductsModel = require('../../models/products.model');
const MongooseConnect = require('../../../services/mongo/connect');
const ProductDTO = require('../../dto/product.dto');

const { logger } = require('../../../utils/logger');

const AppError = require('../../../middlewares/error.middleware');

class ProductMongoRepository{
    constructor() {
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new ProductMongoRepository();
            logger.info('Products Repository: Local Mongo instance created');
        }
        return this.instance
    }

    async getAll(){
        try{
            const query = await ProductsModel.find({});
            return query;
        } catch (err){
            throw new AppError(err.message, 'Mongo data process', 'Products Repository','getAll() error', 500 );
        }
    }

    async append(data){
        try{
            const productStage = new ProductsModel(data);
            return await productStage.save();
        } catch(err) {
            throw new AppError(err.message, 'Mongo data process', 'Products Repository','append() error', 500 );
        }
        
    }

    async getByCondition( fieldName = '_id' , fieldValue ){
        try{
            const query = await ProductsModel.findOne({ [fieldName]: fieldValue });
            const productDTO = await new ProductDTO(query);
            return productDTO;
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process', 'Products Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }
}

module.exports = ProductMongoRepository;