const { check, body } = require('express-validator');
const { validationResult } = require('express-validator')

const validationMiddleware2 = (req, res, next)=> {

    body('username').isLength({min:3}).run(req),
    body('password').isLength({min:12}.run(req)),
    body('email').isEmail().run(req),
    body('age').optional().isInt({min:18, max:100}.run(req))
    //body('age', 'Age must be a number').optional().isNumeric().run(req);

    const validationErrors = validationResult(req);
    
    console.info(validationErrors.isEmpty());

    if(!validationErrors.isEmpty()){
        return res.status(400).send({errors:validationErrors.array()});
    }
    validationResult(req).throw()
    next();
}

const validationMiddleware = (req, res, next)=> {

    body('username').isLength({min:3}).run(req);
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(400).send({errors:validationErrors.array()});
    } else {
        validationResult(req).throw()
        next();
    }
    //body('password').isLength({min:12}),
    //body('email').isEmail(),
    //body('age').optional().isInt({min:18, max:100}),
    //body('age', 'Age must be a number').optional().isNumeric(),
}



module.exports = validationMiddleware;
