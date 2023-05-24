import ProductMemRepository from './repository/product/product.mem.repository';
import ProductFileRepository from './repository/product/product.file.repository';
import ProductMongoRepository from './repository/product/product.mongo.repository';

import CartMemRepository from './repository/cart/cart.mem.repository';
import CartFileRepository from './repository/cart/cart.file.repository';
import CartMongoRepository from './repository/cart/cart.mongo.repository';

import configLoader from '../loaders/config.loader';
const config = configLoader();

class ProductFactory{
    static getInstance() : ProductMongoRepository | ProductFileRepository | ProductMemRepository {
        const db = config.db.DATA_STORAGE;
        if( db === 'MONGO_ATLAS' || db === 'MONGO_DB' ) return ProductMongoRepository.getInstance();
        if( db === 'FILE' ) return ProductFileRepository.getInstance('Products');
        return ProductMemRepository.getInstance();
    }
}

class CartFactory{
    static getInstance() : CartMongoRepository | CartFileRepository | CartMemRepository{
        const db = config.db.DATA_STORAGE;
        if( db === 'MONGO_ATLAS' || db === 'MONGO_DB' ) return CartMongoRepository.getInstance();
        if( db === 'FILE') return  CartFileRepository.getInstance('Cart');
        return CartMemRepository.getInstance();
    }
}

export { ProductFactory, CartFactory };