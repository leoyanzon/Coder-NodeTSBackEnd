import { ProductInterface } from "./product.interfaces";

export interface CartInterface{
    _id? : string,
    userId: string,
    products: ProductInterface[],
    completed: boolean
}

export interface FullCartInterface extends CartInterface {
    _id: string,
}

export interface ICartRepository{
    getAll() : Promise<FullCartInterface[]>;
    append(userData : CartInterface) : Promise<FullCartInterface>;
    update(cartData : FullCartInterface) : Promise<boolean>;
    getLastCart(userId : string ) : Promise<FullCartInterface | []>;
    getByCondition( fieldName : keyof FullCartInterface, fieldValue : string ) : Promise<CartInterface | null>;
    deleteByCondition( fieldName : keyof FullCartInterface, fieldValue : string) : Promise<boolean>;
    deleteAll() : Promise<boolean>;
}