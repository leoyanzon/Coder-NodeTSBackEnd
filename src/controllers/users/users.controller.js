const { UsersFactory } = require('../../dao/factory');
const { logger } = require('../../utils/logger/index'); 

const httpStatus = require('http-status');

const EncryptService = require('../../utils/encrypt/encrypt.service');
const encryptService = new EncryptService();

class UsersController{
    constructor(){
        this.userFactory = UsersFactory.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new UsersController()
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
    userExists = async( username ) => {
        try{
            const data = await this.userFactory.getUserByUserName(username);
            if (!data){
                return {
                    success: false,
                    message: `User ${username} not found`
                }
            }     
            return {
                success: true,
                message: `User ${username} found`,
            }
        } catch(err){
            logger.error(err);
            return({
                success: false,
                message: err
            });
        }
    }
    passwordCheck = async( username, password ) => {
        try{
            const data = await this.userFactory.getPasswordByUserName(username);
            if (!data){
                return {
                    success: false,
                    message: `User not found`
                }
            }
            const passwordChecked = await encryptService.checkPassword('argon2', password, data);
            if (!passwordChecked) return {
                success: false,
                message: 'Wrong password'
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
    save = async(userData) =>{
        try {
            const hashedPassword = await encryptService.hashPassword('argon2', userData.password);
            userData.password = hashedPassword;
            const newUser = {...userData};

            const data = await this.userFactory.save(newUser);
            if (!data) {
                return {
                    success: false,
                    message: `${httpStatus[500]}`
                }
            }
            return {
                success: true,
                message: data
            };
        } catch(err){
            logger.error(err);
            return ({
                success: false,
                message: err
            });
        }
        //logger.info("req",req);
        
    }

    getUserById = async( _id ) => {
        try{
            const data = await this.userFactory.getUserById(_id);
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
            const data = await this.userFactory.getUserByUserName( username );
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

module.exports = UsersController;