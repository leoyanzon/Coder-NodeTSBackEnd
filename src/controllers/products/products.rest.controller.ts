import { Request, Response } from 'express'

import ProductServices from '../../services/product/product.services';
import { logger } from '../../utils/logger/index';

import httpStatus from 'http-status';

import productMockGenerator from '../../tests/products/products.mocks';

class ProductsRestController{
    public static instance: ProductsRestController;
    public productServices: ProductServices;

    constructor(){
        this.productServices = new ProductServices();
        // Create Mock of 10 products
        this.productServices.getAll().then((data)=> {
            if (!data?.length){
                productMockGenerator(10);
            }}
        );
    }

    static getInstance() : ProductsRestController{
        if (!this.instance){
            this.instance = new ProductsRestController();

        }
        return this.instance
    }

    getAll = async(_req : Request, res : Response) : Promise<Response>=>{
        try {
            const data = await this.productServices.getAll();
            
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
            return res.send({
                success: false,
                message: err
            });
        }
    }

    getById = async(req : Request, res : Response) : Promise<Response>=>{
        try {
            const id = req.params.id;
            const data = await this.productServices.getById(id);
            
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
            return res.send({
                success: false,
                message: err
            });
        }
    }

    append = async(req : Request, res : Response) : Promise<Response>=>{
        try {
            const data = await this.productServices.append(req.body);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            return res.status(200).json({
                success: true,
                message: `Product ${data} created`
            });
        } catch(err : any){
            logger.error(err);
            return res.send({
                success: false,
                message: err
            });
        }
    }

    deleteById = async(req : Request, res : Response) : Promise<Response>=>{
        try {
            const id = req.params.id;
            const data = await this.productServices.deleteById(id);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            return res.status(200).json({
                success: true,
                message: `Product ${data} eliminated`
            });
        } catch(err){
            logger.error(err);
            return res.send({
                success: false,
                message: err
            });
        }
    }

    deleteAll = async(_req : Request, res : Response) : Promise<Response>=>{
        try {
            const data = await this.productServices.deleteAll();
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            return res.status(200).json({
                success: true,
                message: `All products eliminated`
            });
        } catch(err){
            logger.error(err);
            return res.send({
                success: false,
                message: err
            });
        }
    }
}

export default ProductsRestController;