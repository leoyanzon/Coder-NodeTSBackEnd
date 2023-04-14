const ProductsMemRepository = require('./repository/products/products.mem.repository');
const ProductsFileRepository = require('./repository/products/products.file.repository');
const ProductsMongoRepository = require('./repository/products/products.mongo.repository');
const ProductsMongoAtlasRepository = require('./repository/products/products.mongoAtlas.repository');

const UsersMemRepository = require('./repository/users/users.mem.repository');
const UsersMongoAtlasRepository = require('./repository/users/users.mongoAtlas.repository');
const UsersMongoRepository = require('./repository/users/users.mongo.repository');

const config = require('../config/config');

class UsersFactory{
    static getInstance(){
        if(config.db.DATA_STORAGE == 'MEM') return UsersMemRepository.getInstance();
        if(config.db.DATA_STORAGE == 'MONGO_ATLAS') return UsersMongoAtlasRepository.getInstance();
        return UsersMongoRepository.getInstance();
    }
}

class ProductsFactory{
    static getInstance(){
        if(config.db.DATA_STORAGE == 'FILE') return ProductsFileRepository.getInstance('Products');
        if(config.db.DATA_STORAGE == 'MEM') return ProductsMemRepository.getInstance();
        if(config.db.DATA_STORAGE == 'MONGO_ATLAS') return ProductsMongoAtlasRepository.getInstance();
        return ProductsMongoRepository.getInstance();
    }
}

module.exports = { UsersFactory, ProductsFactory };