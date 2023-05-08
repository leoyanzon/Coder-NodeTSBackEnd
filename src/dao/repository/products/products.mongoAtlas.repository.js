const ProductsModel = require('../../models/products.model');
const MongooseConnect = require('../../../services/mongo/connect');
const { logger } = require('../../../services/logger');

class ProductsMongoAtlasRepository{
    constructor(){
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new ProductsMongoAtlasRepository();
            logger.info('Products repository created: Mongo Atlas db');
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