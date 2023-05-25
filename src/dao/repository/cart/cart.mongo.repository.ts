import CartsModel from '../../models/cart.model';
import MongooseConnect from '../../../utils/mongo/connect';

import AppError from '../../../middlewares/error.middleware';
import { logger } from '../../../utils/logger/index';

import { ICartRepository, CartInterface, FullCartInterface } from '../../../interfaces/cart.interfaces';

class CartMongoRepository implements ICartRepository{
    public static instance: CartMongoRepository;

    constructor() {
        MongooseConnect.getInstance();
    }

    static getInstance() : ICartRepository {
        if (!this.instance){
            this.instance = new CartMongoRepository();
            logger.info('Carts Repository: Local Mongo instance created');
        }
        return this.instance
    }

    async getAll() : Promise<FullCartInterface[]>{
        try{
            const query : FullCartInterface[] = await CartsModel.find({});
            return query;
        } catch (err : any){
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','getAll() error', 500 );
        }
    }

    async append(cartData : CartInterface) : Promise<FullCartInterface>{
        try{
            const cartStage : any = new CartsModel(cartData);
            return await cartStage.save();
        } catch(err : any) {
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','append() error', 500 );
        }
        
    }

    async update(cartData : FullCartInterface) : Promise<boolean>{
        try{
            const filter = { _id: cartData._id };
            const updatedCart : FullCartInterface = await CartsModel.findOneAndUpdate(filter, cartData, { new: true }).lean();
            
            if(!updatedCart){
                return false;
            }
            return true;
        } catch (err: any){
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','update(cartData) error', 500 );
        }
    }

    async getLastCart(userId : string ) : Promise<FullCartInterface | null>{
        try{
            const query : FullCartInterface = await CartsModel.findOne({ ["userId"]: userId, ["completed"]:false }).lean();
            if (!query){
                return null
            } 
            return query
        } catch (err: any) {
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async getByCondition( fieldName : keyof FullCartInterface, fieldValue : string ) : Promise<FullCartInterface | null>{
        try{
            const query : FullCartInterface = await CartsModel.findOne({ [fieldName]: fieldValue }).lean();
            return query;
        } catch (err : any) {
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async deleteByCondition( fieldName : keyof FullCartInterface, fieldValue : string) : Promise<boolean>{
        try{
            const filter = { [fieldName]: fieldValue };
            const deletedCart = await CartsModel.findOneAndDelete(filter);
            
            if(!deletedCart){
                return false
            }
            return true
        } catch (err : any){
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','deleteByCondition(fieldName,fieldValue) error', 500 );
        }
    }

    async deleteAll() : Promise<boolean> {
        try{
            const deletedCart : any = await CartsModel.deleteMany();
            
            if(!deletedCart.deletedCount == false){
                return false
            }
            return true
        } catch(err : any) {
            throw new AppError(err.message, 'Mongo data process', 'Carts Repository','deleteAll() error', 500 );
        }
    }   
}

export default CartMongoRepository;