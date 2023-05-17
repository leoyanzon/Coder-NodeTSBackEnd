const { UserFactory } = require('../../dao/factory');
const { logger } = require('../../utils/logger/index'); 

const httpStatus = require('http-status');

class UserController{
    constructor(){
        this.userFactory = UserFactory.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new UserController()
        }
        return this.instance
    }
    getAll = async(_req, res) =>{
        try {
            const data = await this.userFactory.getAll();
            
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

    getById = async( _id ) => {
        try{
            const data = await this.userFactory.getByCondition('_id', _id);
            if (!data){
                return {
                    success: false,
                    message: `User id ${_id} not found`
                }
            }     
            return {
                success: true,
                message: data,
            }
        } catch(err){
            logger.error(err);
            return({
                success: false,
                message: err
            });
        }
    }

    getUserByUserName = async( username ) => {
        try{
            const data = await this.userFactory.getByCondition( 'username', username );
            if (!data){
                return {
                    success: false,
                    message: `Username ${username} not found`
                }
            }     
            return {
                success: true,
                message: data,
            }
        } catch(err){
            logger.error(err);
            return({
                success: false,
                message: err
            });
        }
    }

    deleteById = async(req, res) =>{
        try {
            const id = parseInt(req.params.id);
            const data = await this.userFactory.deleteById(id);
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
            const data = await this.userFactory.deleteAll();
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

module.exports = UserController;