class ProductDTO {
    constructor(data){
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.image = data.image;
        this.stock = data.stock;
    }

    build(){
        return this;
    };
}

module.exports = ProductDTO;

