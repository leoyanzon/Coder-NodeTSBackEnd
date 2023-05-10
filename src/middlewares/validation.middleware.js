const { check } = require('express-validator');

const validationMiddleware = (req, res, next)=> {
    const {
        fullName,
        username,
        address,
        age,
        email,
        password
    } = req.body;

    const chequeo1 = check("username").isEmpty().isLength({min:3});
    console.info("chequeo1",chequeo1)
    const chequeo2 = check("password").isLength({min:8, max:15}).withMessage("Your password must be between 8-15 letters");
    console.info("chequeo2",chequeo2);
    return [
        chequeo1,
        chequeo2,
    ]

    next();
}

module.exports = validationMiddleware;