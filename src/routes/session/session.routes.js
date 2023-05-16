const router = require('express').Router();

const passport = require('passport');

const SessionController = require('../../controllers/session/session.controller');
const sessionController = SessionController.getInstance();

const { userValidationChain, userValidationMiddleware } = require('../../middlewares/user.validation.middleware');

const AppError = require('../../middlewares/error.middleware');

router.post('/signup', 
    userValidationChain,
    async (req, res, next) => await userValidationMiddleware(req, res, next),
    passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/error',
        failureFlash: true
    }), 
    async(err, req, res) => {
        sessionController.home(err, req,res);
});

router.post('/signin2', 
    [passport.authenticate('signin', ( err, user, info) => {
        console.info(err);
        console.info(user);
        console.info(info);
        if (err){
            console.info('etapa1')
            /*try{
                new AppError(err, 'Passport signin error', 'Session Router', info, 500);
            } catch(err) {
                console.info('primer catch')
                console.info(err);
                return sessionController.error(err, req, res);
            }*/
        }
        console.info('etapa2')
        /*if (!user){
            try{
                new AppError(info, 'Passport signin failed', 'Session Router', info, 500);
            } catch(err) {
                console.info('segundo catch');
                console.info(err);
                return sessionController.error(err, req, res);
            }
        }*/
        console.info('finalizo')
    })], (req, res, next) => {
        console.info(req)
    })
  

router.get('/signout', 
    (req, res) => {
        sessionController.signOut(req,res);
});

router.post('/error',
    async(req, res) => {
        sessionController.error(req,res);
});

router.post('/signin', function(req, res, next) {
    passport.authenticate('signin', function(err, user, info) {
        if (err) { 
            return next(err); 
        }
        if (!user) {
            const err = new AppError('User not found', 'Session Login', 'Session Router', 'User not found', 500);
            return sessionController.error(err, req, res);
      }
      //console.info(req);
    })(req, res, next);
    console.info('final')
  });

module.exports = router;