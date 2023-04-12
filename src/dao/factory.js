const ProductsMemRepository = require('./repository/products/products.mem');
const ProductsFileRepository = require('./repository/products/products.file');
const ProductsMongoRepository = require('./repository/products/products.mongo');
const ProductsMongoAtlasRepository = require('./repository/products/products.mongoAtlas');

const UsersMemRepository = require('./repository/users/users.mem.repository');
const UsersMongoAtlasRepository = require('./repository/users/users.mongoAtlas.repository');
const UsersMongoRepository = require('./repository/users/users.mongo.repository');

class UsersFactory{
    static get(type){
        if(type == 'MEM') return new UsersMemRepository();
        if(type == 'MONGO_ATLAS') return new UsersMongoAtlasRepository();
        return new UsersMongoRepository();
    }
}

class ProductsFactory{
    static get(type){
        if(type == 'FILE') return new ProductsFileRepository('Products');
        if(type == 'MEM') return new ProductsMemRepository();
        if(type == 'MONGO_ATLAS') return new ProductsMongoAtlasRepository();
        return new ProductsMongoRepository();
    }
}

module.exports = { UsersFactory, ProductsFactory };