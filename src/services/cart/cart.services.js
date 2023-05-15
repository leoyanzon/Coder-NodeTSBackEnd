const { CartFactory } = require('../../dao/factory');

const AppError = require('../../middlewares/error.middleware');

class CartServices {
    constructor(){
        this.cartFactory = CartFactory.getInstance();
    }
    getAll = async() =>{
        try {
            const data = await this.cartFactory.getAll();
            return data;
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Carts Services','getAll error', 500 );
        }
    }
    createCart = async( userId ) => {
        try {
            const newCart = {
                userId: userId,
                products: [],
                completed: false,
            }

            const data = await this.cartFactory.append(newCart);
            return data
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Carts Services','createCart(userId) error', 500 );
        }
    }
    append = async( userId, productToappend ) => {
        try {
            let cartToUpdate = await this.cartFactory.getLastCart( userId );
            if (!cartToUpdate || cartToUpdate.completed){
                await this.createCart( userId );
                cartToUpdate = await this.cartFactory.getLastCart( userId );
            }
            cartToUpdate.products.push( productToappend );
            const data = await this.cartFactory.update(cartToUpdate);
            return data
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Carts Services','append(userId,productToAppend) error', 500 );
        }
    }

    async getById( cartId ){
        try {
            const data = await this.cartFactory.getByCondition('_id', cartId);
            return data;
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Carts Services','getById(cartId) error', 500 );
        }
    }

    async getLastCart(userId){
        try {
            const data = await this.cartFactory.getLastCart(userId);
            return data;
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Carts Services','getLastCart(userId) error', 500 );
        }
    }

    buyCart = async(cartId) =>{
        try {
            let cartSelected = await this.cartFactory.getByCondition('_id', cartId);
            cartSelected.completed = true;
            const data = await this.cartFactory.update(cartSelected);
            return data
        } catch(err){
            throw new AppError(err.message, 'Data process', 'Carts Services','buyCart(cartId) error', 500 );
        }
    }    
}


module.exports = CartServices;