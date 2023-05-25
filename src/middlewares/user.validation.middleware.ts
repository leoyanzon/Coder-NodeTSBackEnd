import { Request, Response, NextFunction } from 'express';
import { body , validationResult} from 'express-validator';

import AppError from './error.middleware';

import PagesController from '../controllers/pages/pages.controller';
const pagesController = PagesController.getInstance();

const userValidationChain = [
    body("fullName")
      .exists({ checkFalsy: true })
      .withMessage("Full name is required")
      .isString()
      .withMessage("User name should be string"),
    body("username")
      .exists({ checkFalsy: true })
      .withMessage("User name is required")
      .isString()
      .withMessage("User name should be string")
      .isLength({min: 4, max: 16})
      .withMessage("User name should be between 2 and 16 letters"),
    body("address")
      .optional(),
    body("age")
      .optional()
      .isNumeric()
      .withMessage("Age number should be a number")
      .custom((value) => {
        if (value < 0 || value > 100) {
          return Promise.reject("Age should be between 0 and 100 years");
        } else {
          return true;
        }
      }),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isString()
      .withMessage("Password should be string")
      .isLength({ min: 5 })
      .withMessage("Password should be at least 5 characters"),
    body("email").optional().isEmail().withMessage("Provide valid email"),
];

const userValidationMiddleware = async (req : Request, res : Response, next : NextFunction) : Promise<void> => {
    const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
          const validationArray = validationErrors.array();
          const validationMessages = (validationArray.map(it => it.msg)).join(' - ');
          const error = new AppError('AppError', 'Session signup', 'User validation middleware', validationMessages , 500);
          req.err = error;
          return pagesController.error( req, res);
    }
    next();
};

export { userValidationChain,
                   userValidationMiddleware};
