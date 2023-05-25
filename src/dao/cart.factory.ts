import CartMemRepository from './repository/cart/cart.mem.repository';
import CartFileRepository from './repository/cart/cart.file.repository';
import CartMongoRepository from './repository/cart/cart.mongo.repository';

import configLoader from '../loaders/config.loader';
const config = configLoader();

import { ICartRepository } from '../interfaces/cart.interfaces';

export default class CartFactory{
    static getInstance() : ICartRepository {
        const db = config.db.DATA_STORAGE;
        if( db === 'MONGO_ATLAS' || db === 'MONGO_DB' ) return CartMongoRepository.getInstance();
        if( db === 'FILE') return  CartFileRepository.getInstance('Cart');
        return CartMemRepository.getInstance();
    }
}