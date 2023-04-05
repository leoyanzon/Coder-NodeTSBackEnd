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
        if(type == 'mem') return new UsersMemRepository();
        if(type == 'mongoAltas') return new UsersMongoAtlasRepository();
        return new UsersMongoRepository();
    }
}

class ProductsFactory{
    static get(type){
        if(type == 'file') return new ProductsFile('Products');
        if(type == 'mem') return new ProductsMem();
        if(type == 'mongoAltas') return new ProductsMongoAtlas();
        return new ProductsMongo();
    }
}

module.exports = { UsersFactory, ProductsFactory };