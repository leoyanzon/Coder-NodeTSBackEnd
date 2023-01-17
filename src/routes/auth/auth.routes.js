const router = require('express').Router();
const basicDecode = require('basic-auth');
const _ = require('lodash');

const authMiddleware = require('../../middlewares/auth.middleware');
const UserService = require('../../services/user/user.service');
const userService = new UserService();

const UserDTO = require('../../dto/user.dto');

const BcryptService = require('../../services/bcrypt/bcrypt.service');
const bcryptService = new BcryptService();

const httpStatus = require('http-status');

router.post('/signin', async( req, res) => {
    try{
        const { name, pass } = basicDecode(req);
        if (_.isNil(name) || _.isNil(pass)) {
            return res.status(400).json({
                success: false,
                message: `${httpStatus[400]}: Username or password missing`
            })
        }
        const userData = await userService.getUserByCondition({
            username: name,
            password: bcryptService.hashPassword(pass)
        });
        if (!userData) {
            return res.status(403).json({
                success: false,
                message: `${httpStatus[403]}: Bad username or password`
            })
        }

        const userDataFormatted = new UserDTO(userData).build();

        //Aqui va el passport???

        return res.status(200).json({
            success: true,
            userDataFormatted
        });

    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `${httpStatus[500]}: Internal error`
        });
    }
})

router.post('/signup', async( req, res) => {
    try{
        const { username, password, fullName } = req.body;
        if (_.isNil(username) || _.isNil(password) || _.isNil(fullName)){
            return res.status(400).json({
                success: false,
                message: `${httpStatus[400]}: Username, password or name missing}`
            });
        }
        const checkUser = await userService.getUserByCondition({ username });
        if (checkUser){
            return res.status(409).json({
                success: false,
                message: `${httpStatus[409]}: User already exists`
            });
        }
        const newUser = await userService.createUser({
            username,
            password: bcryptService.hashPassword(password),
            fullName,
        });
        if ( !newUser ){
            return res.status(500).json({
                success: false,
                message: `${httpStatus[500]}: Error`
            })
        }

        const userDataFormatted = new UserDTO(newUser).build();

        //Aqui va el passport???

        res.status(200).json({
            success: true,
            expiresIn: 60 * 60,
            data: userDataFormatted
        })

    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `${httpStatus[500]}: Internal error`
        });
    }
})

module.exports = router;