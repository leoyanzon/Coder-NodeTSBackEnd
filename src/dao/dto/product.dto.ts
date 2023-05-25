import { ProductInterface } from "../../interfaces/product.interfaces";

class ProductDTO {
    name : string;
    description: string;
    price: number;
    image: string;
    stock: number;

    constructor(data : ProductInterface){
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.image = data.image;
        this.stock = data.stock;
    }

    build() : ProductDTO{
        return this;
    };
}

export default ProductDTO;

