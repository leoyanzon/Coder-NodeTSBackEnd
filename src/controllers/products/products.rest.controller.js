const { ProductsFactory } = require('../../dao/factory');
const { logger } = require('../../utils/logger/index');

const httpStatus = require('http-status');

const productMockGenerator = require('../../tests/products/products.mocks');

class ProductsRestController{
    constructor(){
        this.productFactory = ProductsFactory.getInstance();
        
        // Create Mock of 10 products
        this.productFactory.getAll().then((data)=> {
            if (data.length < 1){
                productMockGenerator(10);
            }}
        );
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new ProductsRestController();

        }
        return this.instance
    }

    getAll = async(_req, res) =>{
        try {
            const data = await this.productFactory.getAll();
            
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            
            return res.status(200).json({
                success: true,
                message:data
            });

        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    getById = async(req, res) =>{
        try {
            const id = req.params.id;
            const data = await this.productFactory.getById(id);
            
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }

            return res.status(200).json({
                success: true,
                message: data
            });

        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    save = async(req, res) =>{
        try {
            const data = await this.productFactory.save(req.body);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `Product ${data} created`
            });
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    deleteById = async(req, res) =>{
        try {
            const id = req.params.id;
            const data = await this.productFactory.deleteById(id);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `Product ${data} eliminated`
            });
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    deleteAll = async(_req, res) =>{
        try {
            const data = await this.productFactory.deleteAll();
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `All products eliminated`
            });
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }
}

module.exports = ProductsRestController;