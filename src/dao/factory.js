const ProductMemRepository = require('./repository/product/product.mem.repository');
const ProductFileRepository = require('./repository/product/product.file.repository');
const ProductMongoRepository = require('./repository/product/product.mongo.repository');

const UserMemRepository = require('./repository/user/user.mem.repository');
const UserFileRepository = require('./repository/user/user.file.repository');
const UserMongoRepository = require('./repository/user/user.mongo.repository');

const CartMemRepository = require('./repository/cart/cart.mem.repository');
const CartFileRepository = require('./repository/cart/cart.file.repository');
const CartMongoRepository = require('./repository/cart/cart.mongo.repository');

const config = require('../loaders/config.loader')();

class UserFactory{
    static getInstance(){
        const db = config.db.DATA_STORAGE;
        if( db === 'MONGO_ATLAS' || db === 'MONGO_DB' ) return UserMongoRepository.getInstance();
        if( db === 'FILE' ) return UserFileRepository.getInstance('Users');
        return UserMemRepository.getInstance();
    }
}

class ProductFactory{
    static getInstance(){
        const db = config.db.DATA_STORAGE;
        if( db === 'MONGO_ATLAS' || db === 'MONGO_DB' ) return ProductMongoRepository.getInstance();
        if( db === 'FILE' ) return ProductFileRepository.getInstance('Products');
        return ProductMemRepository.getInstance();
    }
}

class CartFactory{
    static getInstance(){
        const db = config.db.DATA_STORAGE;
        if( db === 'MONGO_ATLAS' || db === 'MONGO_DB' ) return CartMongoRepository.getInstance('Cart');
        if( db === 'FILE') return CartFileRepository.getInstance('Cart');
        return CartMemRepository.getInstance();
    }
}

module.exports = { UserFactory, ProductFactory, CartFactory };