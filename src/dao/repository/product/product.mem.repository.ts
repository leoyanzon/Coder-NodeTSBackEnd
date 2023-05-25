import ProductDTO from '../../dto/product.dto';
import { logger } from '../../../utils/logger';
import {v4 as uuidv4} from 'uuid';

import AppError from '../../../middlewares/error.middleware';
import { FullProductInterface, IProductRepository, ProductInterface } from '../../../interfaces/product.interfaces';

class ProductMemRepository implements IProductRepository{
    public static instance: ProductMemRepository;
    public products : FullProductInterface[]
    constructor(){
        this.products = [];
    }

    static getInstance() : IProductRepository{
        if (!this.instance){
            this.instance = new ProductMemRepository();
            logger.info('Products Repository: Memory created');
        }
        return this.instance;
    }
    async getAll() : Promise<FullProductInterface[]>{
        try{
            return this.products;
        } catch (err : any){
            throw new AppError(err.message, 'Memory data process', 'Products Repository','getAll() error', 500 );
        }
    }
    async append(productData : ProductInterface) : Promise<FullProductInterface>{
        try{
            const _id : string = uuidv4();
            const productDTO : ProductInterface = new ProductDTO(productData);
            const newProduct : FullProductInterface = {...productDTO, _id:_id};
            this.products.push(newProduct);
            return newProduct
        } catch (err : any){
            throw new AppError(err.message, 'Memory data process', 'Products Repository','append() error', 500 );
        }
    }
    async getByCondition( fieldName : keyof FullProductInterface = "_id", fieldValue : string) : Promise<ProductInterface | null>{
        try{
            const query : FullProductInterface[] = this.products.filter(it => it[fieldName] === fieldValue);
            if ( query?.length > 0 ) {
                return null;
            }
            const productDTO : ProductInterface = new ProductDTO(query[0]);
            return productDTO;
        } catch(err : any) {
            throw new AppError(err.message, 'Memory data process', 'Products Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteByCondition( fieldName : keyof FullProductInterface = "_id", fieldValue : string) : Promise<boolean> {
        try{
            const filteredObject : FullProductInterface[] = this.products.filter(it => it[fieldName] != fieldValue);
            if ( this.products  === filteredObject ) {
                return false
            }
            this.products = filteredObject;
            return true;
        } catch(err : any) {
            throw new AppError(err.message, 'Memory data process', 'Products Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteAll() : Promise<boolean> {
        try{
            this.products = [];
            return true
        } catch(err : any) {
            throw new AppError(err.message, 'Memory data process', 'Products Repository','deleteAll error', 500 );
        }
    }
}

export default ProductMemRepository;