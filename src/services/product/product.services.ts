import ProductFactory from '../../dao/product.factory';

import AppError from '../../middlewares/error.middleware';

import { IProductRepository , FullProductInterface, ProductInterface } from '../../interfaces/product.interfaces';

class ProductServices{
    private productFactory : IProductRepository;

    constructor(){
        this.productFactory = ProductFactory.getInstance();
    }

    getAll = async() : Promise<FullProductInterface[]> =>{
        try {
            const data = await this.productFactory.getAll();
            return data;
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Products Services','getAll() error', 500 );
        }
    }
    getById = async( _id : string ) : Promise<FullProductInterface | null> => {
        try{
            const data : FullProductInterface | null = await this.productFactory.getByCondition('_id', _id);
            return data
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Products Services','getByCondition(_id) error', 500 );
        }
    }
    append = async(productData : ProductInterface) : Promise<FullProductInterface> =>{
        try {
            const data = await this.productFactory.append(productData);
            return data
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Products Services','append(productData) error', 500 );
        }
    }
    deleteById = async( _id : string) : Promise<boolean> =>{
        try {
            const data = await this.productFactory.deleteByCondition('_id', _id);
            return true
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Products Services','deleteById(_id) error', 500 );
        }
    }
    deleteAll = async() : Promise<boolean> =>{
        try {
            const data = await this.productFactory.deleteAll();
            return true
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Products Services','deleteById(_id) error', 500 );
        }
    }
}

export default ProductServices;