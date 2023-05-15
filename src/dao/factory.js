const ProductMemRepository = require('./repository/product/product.mem.repository');
const ProductFileRepository = require('./repository/product/product.file.repository');
const ProductMongoRepository = require('./repository/product/product.mongo.repository');
const ProductMongoAtlasRepository = require('./repository/product/product.mongoAtlas.repository');

const UserMemRepository = require('./repository/user/user.mem.repository');
const UserFileRepository = require('./repository/user/user.file.repository');
const UserMongoAtlasRepository = require('./repository/user/user.mongoAtlas.repository');
const UserMongoRepository = require('./repository/user/user.mongo.repository');

const CartMemRepository = require('./repository/cart/cart.mem.repository');
const CartFileRepository = require('./repository/cart/cart.file.repository');

const config = require('../loaders/config.loader')();

class UserFactory{
    static getInstance(){
        if(config.db.DATA_STORAGE == 'MEM') return UserMemRepository.getInstance();
        if(config.db.DATA_STORAGE == 'FILE') return UserFileRepository.getInstance('Users');
        if(config.db.DATA_STORAGE == 'MONGO_ATLAS') return UserMongoAtlasRepository.getInstance();
        return UserMongoRepository.getInstance();
    }
}

class ProductFactory{
    static getInstance(){
        if(config.db.DATA_STORAGE == 'MEM') return ProductMemRepository.getInstance();
        if(config.db.DATA_STORAGE == 'FILE') return ProductFileRepository.getInstance('Products');
        if(config.db.DATA_STORAGE == 'MONGO_ATLAS') return ProductMongoAtlasRepository.getInstance();
        return ProductMongoRepository.getInstance();
    }
}

class CartFactory{
    static getInstance(){
        if(config.db.DATA_STORAGE == 'FILE') return CartFileRepository.getInstance('Cart');
        return CartMemRepository.getInstance();
    }
}

module.exports = { UserFactory, ProductFactory, CartFactory };