const ProductsModel = require('../../models/products.model');
const MongooseConnect = require('../../../utils/mongo/connect');
const { logger } = require('../../../utils/logger');

class ProductsMongoAtlasRepository{
    constructor(){
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new ProductsMongoAtlasRepository();
            logger.info('Products Repository: Mongo Atlas instance created');
        }
        return this.instance
    }

    async save(data){
        const stageProduct = new ProductsModel(data);
        return await stageProduct.save();
    }
    async getById(id){
        return await ProductsModel.findOne({_id: id});
    }
    async getAll(){
        return await ProductsModel.find({});
    }
}

module.exports = ProductsMongoAtlasRepository;