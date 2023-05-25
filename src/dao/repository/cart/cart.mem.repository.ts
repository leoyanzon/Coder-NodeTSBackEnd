import { logger } from '../../../utils/logger';
import {v4 as uuidv4} from 'uuid';

const CartDTO = require('../../dto/cart.dto');

import AppError from '../../../middlewares/error.middleware';
import { ICartRepository, CartInterface, FullCartInterface } from '../../../interfaces/cart.interfaces';

class CartMemRepository implements ICartRepository{
    public static instance : CartMemRepository;
    public cart : FullCartInterface[];

    constructor(){
        this.cart = [];
    }

    static getInstance() : ICartRepository{
        if (!this.instance){
            this.instance = new CartMemRepository();
            logger.info('Cart Repository: Memory created');
        }
        return this.instance;
    }
    async getAll() : Promise<FullCartInterface[]>{
        try{
            return this.cart;
        } catch (err : any){
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','getAll() error', 500 );
        }
    }
    async append(cartData : CartInterface) : Promise<FullCartInterface>{
        try{
            const _id : string = uuidv4();
            const cartDTO : CartInterface = await new CartDTO(cartData);
            const newCart : FullCartInterface = {...cartDTO, _id:_id};
            this.cart.push(newCart);
            return newCart
        } catch (err : any){
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','append() error', 500 );
        }
    }
    async update(cartData : FullCartInterface) : Promise<boolean>{
        try{
            this.cart.map(item => {
                if (item._id == cartData._id){
                    item = cartData;
                }
                return item
            })
            return true
        } catch (err: any){
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','update(cartData) error', 500 );
        }
    }
    async getLastCart(userId : string ) : Promise<FullCartInterface | []>{
        try{
            const query : FullCartInterface[] = this.cart.filter(it => (it.userId === userId && it.completed == false));
            if ( !query?.length ){
                return []
            } 
            return query[ query.length - 1 ];
        } catch(err : any) {
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','getLastCart(userId) error', 500 );
        }
    }
    async getByCondition( fieldName : keyof FullCartInterface, fieldValue : string ) : Promise<CartInterface | null>{
        try{
            const query : FullCartInterface[] = this.cart.filter(it => it[fieldName] === fieldValue);
            if ( !query?.length ){
                return null
            } 
            const cartDTO : CartInterface = new CartDTO(query);
            return cartDTO;
        } catch(err : any) {
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteByCondition( fieldName : keyof FullCartInterface, fieldValue : string) : Promise<boolean>{
        try{
            const filteredObject : FullCartInterface[] = this.cart.filter(it => it[fieldName] != fieldValue);
            if ( this.cart  === filteredObject ) {
                return false
            }
            this.cart = filteredObject;
            return true;
        } catch(err : any) {
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteAll() : Promise<boolean> {
        try{
            this.cart = [];
            return true
        } catch(err : any) {
            throw new AppError(err.message, 'Memory data process', 'Carts Repository','deleteAll error', 500 );
        }
    }
}

export default CartMemRepository;