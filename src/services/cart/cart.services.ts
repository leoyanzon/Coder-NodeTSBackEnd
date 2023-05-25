import CartFactory from '../../dao/cart.factory';

import sendEmail from '../../utils/nodeMailer/nodeMailer.service';
import sendWhatsappAsync from '../../utils/twilio/whatsapp.services';

import AppError from '../../middlewares/error.middleware';

import { ICartRepository, FullCartInterface, CartInterface } from '../../interfaces/cart.interfaces';
import { FullProductInterface } from '../../interfaces/product.interfaces';

class CartServices{
    private cartFactory : ICartRepository

    constructor(){
        this.cartFactory = CartFactory.getInstance();
    }
    getAll = async() : Promise<FullCartInterface[]> =>{
        try {
            const data : FullCartInterface[] = await this.cartFactory.getAll();
            return data;
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Carts Services','getAll error', 500 );
        }
    }
    createCart = async( userId : string ) : Promise<FullCartInterface> => {
        try {
            const newCart : CartInterface = {
                userId: userId,
                products: [],
                completed: false,
            }

            const data : FullCartInterface = await this.cartFactory.append(newCart);
            return data
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Carts Services','createCart(userId) error', 500 );
        }
    }
    append = async( userId : string , productToappend : FullProductInterface) : Promise<FullCartInterface>=> {
        try {
            let cartToUpdate : FullCartInterface | null = await this.cartFactory.getLastCart( userId );
            if (cartToUpdate === null ){
                await this.createCart( userId );
                cartToUpdate = await this.cartFactory.getLastCart( userId );
            }
            if (cartToUpdate !== null && cartToUpdate.completed) {
                await this.createCart( userId );
                cartToUpdate = await this.cartFactory.getLastCart( userId );   
            }
            cartToUpdate!.products.push( productToappend ); // El operador ! le dice al compilador que estamos seguros que cartToUpdate no es nulo
            const data : boolean = await this.cartFactory.update(cartToUpdate!);
            return cartToUpdate!
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Carts Services','append(userId,productToAppend) error', 500 );
        }
    }

    getById = async ( cartId : string ) : Promise<FullCartInterface | null>=> {
        try {
            const data : FullCartInterface | null = await this.cartFactory.getByCondition('_id', cartId);
            return data;
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Carts Services','getById(cartId) error', 500 );
        }
    }

    getLastCart = async (userId : string ) : Promise<FullCartInterface | null>=> {
        try {
            const data : FullCartInterface | null = await this.cartFactory.getLastCart(userId);
            return data;
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Carts Services','getLastCart(userId) error', 500 );
        }
    }

    buyCart = async(cartId : string) : Promise<boolean> =>{
        try {
            let cartSelected : FullCartInterface | null = await this.cartFactory.getByCondition('_id', cartId);
            if (cartSelected !== null) {
                cartSelected.completed = true;
                const data : boolean = await this.cartFactory.update(cartSelected);
                if (data){
                    await sendWhatsappAsync(`Cart ${cartId} booked successfully`);
                    await sendEmail(`Cart ${cartId} booked successfully`,`Congratulations! Cart: ${data} booked successfully`, 'leoyanzon@gmail.com');
                }
                return data
            }
            return false
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Carts Services','buyCart(cartId) error', 500 );
        }
    }
    deleteById = async( cartId : string ) : Promise<boolean> =>{
        try {
            const data : boolean = await this.cartFactory.deleteByCondition('_id', cartId);
            return data
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Users Services','deleteById error', 500 );
        }
    }  
    deleteAll = async() : Promise<boolean> =>{
        try {
            const data = await this.cartFactory.deleteAll();
            return data
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Users Services','deleteById error', 500 );
        }
    }  
}

export default CartServices;