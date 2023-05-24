import { Request, Response } from 'express';
import ProductServices from '../../services/product/product.services';
import { ProductInterface } from '../../dao/dto/product.dto';

import { logger } from '../../utils/logger/index';

class ProductsGraphQlController{

    public static instance : ProductsGraphQlController;
    public productServices : ProductServices;

    constructor(){
        this.productServices = new ProductServices();;
    }

    static getInstance() : ProductsGraphQlController{
        if (!this.instance){
            this.instance = new ProductsGraphQlController()
        }
        return this.instance
    }

    getAll = async () : Promise<ProductInterface[]> =>{
        try{
            const query = await this.productServices.getAll();
            return query
        } catch(err : any){
            return err
        }
    }

    getById = async(_id : string) : Promise<ProductInterface> =>{
        try {
            const query = await this.productServices.getById(_id);
            return query
        } catch(err : any){
            return err
        }
    }

    append = async(req : Request, res : Response) : Promise<boolean> =>{
        try {
            const mutation = await this.productServices.append(req.body);
            return true;
        } catch(err){
            logger.error(err);
            return false;
        }
    }

    deleteById = async(req : Request, res : Response) : Promise<boolean> =>{
        try {
            const id = parseInt(req.params.id);
            const data = await this.productServices.deleteById(id);
            if (!data) {
                return false;
            }
            return true;
        } catch(err : any){
            logger.error(err);
            return false;
        }
    }

    deleteAll = async() : Promise<boolean> => {
        try {
            const data = await this.productServices.deleteAll();
            if (!data) {
                return false;
            }
            return true;
        } catch(err : any){
            logger.error(err);
            return false;
        }
    }
}

export default ProductsGraphQlController;