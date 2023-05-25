import ProductMemRepository from './repository/product/product.mem.repository';
import ProductFileRepository from './repository/product/product.file.repository';
import ProductMongoRepository from './repository/product/product.mongo.repository';

import configLoader from '../loaders/config.loader';
const config = configLoader();

import { IProductRepository } from '../interfaces/product.interfaces';



export default class ProductFactory{
    static getInstance() : IProductRepository {
        const db = config.db.DATA_STORAGE;
        if( db === 'MONGO_ATLAS' || db === 'MONGO_DB' ) return ProductMongoRepository.getInstance();
        if( db === 'FILE' ) return ProductFileRepository.getInstance('Products');
        return ProductMemRepository.getInstance();
    }
}
