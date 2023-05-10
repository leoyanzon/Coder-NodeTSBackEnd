const { CartFactory } = require('../../dao/factory');
const { logger } = require('../../services/logger/index');

class CartController{
    constructor(){
        this.cartFactory = CartFactory.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new CartController();

        }
        return this.instance
    }

    getAll = async(_req, res) =>{
        try {
            const data = await this.cartFactory.getAll();
            
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
            const data = await this.cartFactory.getById(id);
            
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
            const data = await this.cartFactory.save(req.body);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `Product ${data} added to cart`
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
            const data = await this.cartFactory.deleteById(id);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `Product ${data} deleted from cart`
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
            const data = await this.cartFactory.deleteAll();
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `All products deleted from Cart`
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

module.exports = CartController;