import { FullCartInterface } from "../../interfaces/cart.interfaces";
import { ProductInterface } from "../../interfaces/product.interfaces";
class CartDTO {
    _id?: string | undefined;
    userId: string;
    products: ProductInterface[];
    completed: boolean;

    constructor(cartData : FullCartInterface){
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