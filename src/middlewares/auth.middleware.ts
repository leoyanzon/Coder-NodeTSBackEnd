import { Request, Response , NextFunction, RequestHandler } from 'express';

import PagesController from '../controllers/pages/pages.controller';
const pagesController = PagesController.getInstance();

const authMiddleware = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
    if(!req.isAuthenticated()){
        return await pagesController.signIn(req, res);
    }
    next();
}

export default authMiddleware;