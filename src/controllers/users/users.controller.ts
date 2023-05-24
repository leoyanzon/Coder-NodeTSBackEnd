import { Request, Response } from 'express';
import UserServices from '../../services/user/user.services';
import { logger } from '../../utils/logger/index'; 

import httpStatus from 'http-status';

class UserController{
    public static instance: UserController;
    public userService : UserServices;

    constructor(){
        this.userService = new UserServices();
    }

    static getInstance() : UserController{
        if (!this.instance){
            this.instance = new UserController()
        }
        return this.instance
    }
    getAll = async(_req : Request, res : Response) : Promise<Response> =>{
        try {
            const data = await this.userService.getAll();
            
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

        } catch(err : any){
            logger.error(err);
            return res.send({
                success: false,
                message: err
            });
        }
    }

    deleteById = async(req: Request , res: Response) : Promise<Response> =>{
        try {
            const _id : string = req.params._id;
            const data = await this.userService.deleteById(_id);
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

    deleteAll = async(_req : Request, res: Response) : Promise<Response>=>{
        try {
            const data = await this.userService.deleteAll();
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

export default UserController;