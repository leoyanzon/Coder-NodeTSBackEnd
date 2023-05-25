import { Request, Response } from 'express';
import ProductServices from '../../services/product/product.services';
import { FullProductInterface, ProductInterface } from '../../interfaces/product.interfaces';

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

    getById = async(_id : string) : Promise<FullProductInterface | null> =>{
        try {
            const query : FullProductInterface | null = await this.productServices.getById(_id);
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
            const _id = req.params._id;
            const data = await this.productServices.deleteById(_id);
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