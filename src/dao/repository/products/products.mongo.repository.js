const ProductsModel = require('../../models/products.model');
const MongooseConnect = require('../../../utils/mongo/connect');
const { logger } = require('../../../utils/logger');

class ProductsMongoRepository{
    constructor() {
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new ProductsMongoRepository();
            logger.info('Products Repository: Local Mongo instance created');
        }
        return this.instance
    }

    async save(userData){
        const productStage = new ProductsModel(userData);
        return await productStage.save();
    }

    async getById(id){
        return await ProductsModel.findOne({_id: id});
    }
    
    async getAll(){
        return await ProductsModel.find({});
    }


}

module.exports = ProductsMongoRepository;