import { Request, Response , NextFunction } from 'express';

import PagesController from '../controllers/pages/pages.controller';
const pagesController = PagesController.getInstance();

const authMiddleware = (req : Request, res : Response, next : NextFunction) : void => {
    if(!req.isAuthenticated()){
        pagesController.signIn(req, res);
        return;
    }
    next();
}

export default authMiddleware;