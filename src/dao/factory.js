const UsersMongo = require('./repository/users/users.mongo.repository');
const UsersMem = require('./repository/users/users.mem.repository');
const UsersMongoAtlas = require('./repository/users/users.mongoAtlas.repository');
const ProductsMongo = require('./repository/products/products.mongo');
const ProductsMem = require('./repository/products/products.mem');
const ProductsMongoAtlas = require('./repository/products/products.mongoAtlas');
const ProductsFile = require('./repository/products/products.file');
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
        if(type == 'FILE') return new ProductsFile('Products');
        if(type == 'MEM') return new ProductsMem();
        if(type == 'MONGO_ATLAS') return new ProductsMongoAtlas();
        return new ProductsMongo();
    }
}

module.exports = { UsersFactory, ProductsFactory };