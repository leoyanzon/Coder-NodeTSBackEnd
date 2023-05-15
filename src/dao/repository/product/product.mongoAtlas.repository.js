const ProductsModel = require('../../models/products.model');
const MongooseConnect = require('../../../services/mongo/connect');
const { logger } = require('../../../utils/logger');

const AppError = require('../../../middlewares/error.middleware');

class ProductMongoAtlasRepository{
    constructor(){
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new ProductMongoAtlasRepository();
            logger.info('Products Repository: Mongo Atlas instance created');
        }
        return this.instance
    }

    async getAll(){
        try{
            const query = await ProductsModel.findOne({});
            return query;
        } catch (err){
            throw new AppError(err.message, 'Mongo Atlas data process', 'Products Repository','getAll() error', 500 );
        }
    }

    async append(data){
        try{
            const productStage = new ProductsModel(data);
            return await productStage.save();
        } catch(err) {
            throw new AppError(err.message, 'Mongo Atlas data process', 'Products Repository','append() error', 500 );
        }
        
    }

    async getByCondition( _ , condition ){
        try{
            const query = await ProductsModel.findOne({ condition });
            const productDTO = await new ProductDTO(query);
            return productDTO;
        } catch (err) {
            throw new AppError(err.message, 'Mongo Atlas data process', 'Products Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }
}

module.exports = ProductMongoAtlasRepository;