import { ProductInterface } from "./product.dto";

export interface CartInterface{
    _id? : string,
    userId: string,
    products: ProductInterface[],
    completed: boolean
}

class CartDTO {
    _id?: string | undefined;
    userId: string;
    products: ProductInterface[];
    completed: boolean;

    constructor(cartData : CartInterface){
        this._id = cartData._id;
        this.userId = cartData.userId;
        this.products = cartData.products;
        this.completed = cartData.completed;
    }

    build() : CartDTO{
        return this;
    };
}

export default CartDTO;