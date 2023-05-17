const router = require('express').Router();

const passport = require('passport');

const PagesController = require('../../controllers/pages/pages.controller');
const pagesController = PagesController.getInstance();

const { userValidationChain, userValidationMiddleware } = require('../../middlewares/user.validation.middleware');

const { logger } = require('../../utils/logger/index');

router.post('/signin', 
passport.authenticate('signin', {failureRedirect: '/error?code=401'}), 
    async(req, res) => {
        await pagesController.home(req,res);
});

router.post('/signup', 
    userValidationChain,
    async (req, res, next) => await userValidationMiddleware(req, res, next),
    passport.authenticate('signup', {failureRedirect: '/error?code=500'}), 
    async(req, res) => {
        await pagesController.home(req,res);
});

router.get('/signout', 
    async (req, res) => {
        req.logOut(async ()=>{
            logger.info('Passport: user logged out successfully'); 
            return await pagesController.signOut(req , res);
        });
        
        
});

router.post('/error',
    async( req, res) => {
        return await pagesController.error( req, res);
});

module.exports = router;