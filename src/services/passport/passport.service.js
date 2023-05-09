const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//tengo que remplazar Usermodel por UsersFactory
const UsersController = require('../../controllers/users/users.controller');
const usersController = UsersController.getInstance();

const sendEmail = require('../nodeMailer/nodeMailer.service');
const sendWhatsappAsync = require('../twilio/whatsapp.services');

const { logger } = require('../logger/index');

passport.use('signin', new LocalStrategy(async(username, password, done) => {
    try{
        const checkUser = await usersController.userExists( username );
        if(!checkUser.success){
            logger.error(checkUser.message)
            return done(null, false);
        }

        const checkPassword = await usersController.passwordCheck( username, password );
        if(!checkPassword.success){
            logger.error(checkPassword.message)
            return done(null, false);
        }

        const data = await usersController.getUserByUserName(username);
        if(!data.success){
            logger.error(data.message)
            return done(null, false);
        }
        logger.info(`Passport: user ${username} logged successfully`);
        return done(null,data.message);
    } catch(err) {
        logger.error(`Passport error: ${err}`)
        return done(null, false);
    }
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, _password, done) => {
    try{
        const data = await usersController.userExists( username );
        if(data.success){
            logger.info(`Passport: user ${username} already exists`)
            return done(null, false);
        }

        const stageUser = await usersController.save(req.body);
        if(!stageUser.success){
            logger.error(`Passport error: ${err}`)
            return done(null, false);
        }
        const newUser = stageUser.message;
        logger.info(`Passport: new user created successfully`);

        const whatsapp = await sendWhatsappAsync(`User ${newUser.username} created successfully`);
        if (whatsapp.success) logger.info(`Whatsapp message sent with sid:${whatsapp.message}`);
        const email = await sendEmail(`User ${newUser.username} created successfully`, 'leoyanzon@gmail.com');
        if (email.success) logger.info(`Email message sent:${email.message}`)

        done(null, newUser);
    } catch(err) {
        done(null, err);
    } 
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (_id, done) => {
    const userData = await usersController.getUserById(_id);
    done(null, userData.message);
})

module.exports = passport;