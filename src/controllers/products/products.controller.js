const { ProductsFactory } = require('../../dao/factory');
const { logger } = require('../../services/logger/index'); 

class ProductController{
    constructor(){
        this.productFactory = new ProductsFactory();
    }

    getProduct = async( req, res) =>{
        try {
            const id = req.params.id;
            const products = await this.productFactory.getProduct(id);
            
            res.send(products);
        } catch(err){
            logger.error(err);
        }
    }
}

module.exports = ProductController;