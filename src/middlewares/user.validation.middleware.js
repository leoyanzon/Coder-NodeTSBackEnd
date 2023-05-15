const { body , validationResult} = require('express-validator');

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
      .isLength({min: 4, max: 10})
      .withMessage("User name should be between 2 and 10 letters"),
    body("address")
      .optional(),
    body("age")
      .optional()
      .isNumeric()
      .withMessage("age number should be a number")
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

const userValidationMiddleware = async (req, res, next) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }
    next();

};

module.exports = { userValidationChain,
                   userValidationMiddleware};
