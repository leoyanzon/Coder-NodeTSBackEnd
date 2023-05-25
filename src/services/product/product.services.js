const { ProductFactory } = require('../../dao/cart.factory');

const AppError = require('../../middlewares/error.middleware');

class ProductServices{
    constructor(){
        this.productFactory = ProductFactory.getInstance();
    }

    getAll = async() =>{
        try {
            const data = await this.productFactory.getAll();
            return data;
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Products Services','getAll() error', 500 );
        }
    }
    getById = async( _id ) => {
        try{
            const data = await this.productFactory.getByCondition('_id', _id);
            return data
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Products Services','getByCondition(_id) error', 500 );
        }
    }
    append = async(productData) =>{
        try {
            const data = await this.productFactory.append(productData);
            return data
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Products Services','append(productData) error', 500 );
        }
    }
    deleteById = async( _id ) =>{
        try {
            const data = await this.productFactory.deleteByCondition('_id', _id);
            return true
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Products Services','deleteById(_id) error', 500 );
        }
    }
    deleteAll = async() =>{
        try {
            const data = await this.productFactory.deleteAll();
            return true
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Products Services','deleteById(_id) error', 500 );
        }
    }
}

module.exports = ProductServices;