import ProductsModel from '../../models/products.model';
import MongooseConnect from '../../../utils/mongo/connect'

import AppError from '../../../middlewares/error.middleware';
import { logger } from '../../../utils/logger/index';

import {IProductRepository, ProductInterface , FullProductInterface } from '../../../interfaces/product.interfaces';

class ProductMongoRepository implements IProductRepository{
    public static instance : ProductMongoRepository;

    constructor() {
        MongooseConnect.getInstance();
    }

    static getInstance() : IProductRepository {
        if (!this.instance){
            this.instance = new ProductMongoRepository();
            logger.info('Products Repository: Local Mongo instance created');
        }
        return this.instance
    }

    async getAll() : Promise<FullProductInterface[]>{
        try{
            const query : FullProductInterface[] = await ProductsModel.find({});
            return query;
        } catch (err : any){
            throw new AppError(err.message, 'Mongo data process', 'Products Repository','getAll() error', 500 );
        }
    }

    async append(productData : ProductInterface) : Promise<FullProductInterface>{
        try{
            const productStage : any = new ProductsModel(productData);
            return await productStage.save();
        } catch(err : any ) {
            throw new AppError(err.message, 'Mongo data process', 'Products Repository','append() error', 500 );
        }
        
    }

    async getByCondition( fieldName : keyof FullProductInterface = "_id", fieldValue : string) : Promise<ProductInterface | null>{
        try{
            const query : FullProductInterface = await ProductsModel.findOne({ [fieldName]: fieldValue }).lean();
            return query;
        } catch (err : any) {
            throw new AppError(err.message, 'Mongo data process', 'Products Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async deleteByCondition( fieldName : keyof FullProductInterface = "_id", fieldValue : string) : Promise<boolean> {
        try{
            const query : any = await ProductsModel.deleteOne({ [fieldName]: fieldValue })
            return true;
        } catch(err : any) {
            throw new AppError(err.message, 'Memory data process', 'Users Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteAll() : Promise<boolean> {
        try{
            const query : any = await ProductsModel.deleteMany();
            return true
        } catch(err: any) {
            throw new AppError(err.message, 'Memory data process', 'Users Repository','deleteAll error', 500 );
        }
    }
}

export default ProductMongoRepository;