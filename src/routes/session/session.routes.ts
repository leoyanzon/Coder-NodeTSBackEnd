import express , {  Router, Request, Response } from 'express';
const router : Router = express.Router();

import passport from 'passport';

import PagesController from '../../controllers/pages/pages.controller';
const pagesController = PagesController.getInstance();

import { userValidationChain, userValidationMiddleware } from '../../middlewares/user.validation.middleware';

import { logger } from '../../utils/logger/index';
import { NextFunction } from 'express-serve-static-core';

router.post('/signin', 
passport.authenticate('signin', {failureRedirect: '/error?code=401'} as any), 
    async(req : any, res : Response) => {
        await pagesController.home(req,res);
});

router.post('/signup', 
    userValidationChain,
    async (req : any, res: Response, next : NextFunction) => await userValidationMiddleware(req, res, next),
    passport.authenticate('signup', {failureRedirect: '/error?code=500'}), 
    async(req : any, res : Response) => {
        await pagesController.home(req,res);
});

router.get('/signout', 
    async (req : any, res : Response) => {
        req.logOut(async ()=>{
            logger.info('Passport: user logged out successfully'); 
            return await pagesController.signOut(req , res);
        });
        
        
});

router.post('/error',
    async( req : any, res : Response) => {
        return await pagesController.error( req, res);
});

export default router;