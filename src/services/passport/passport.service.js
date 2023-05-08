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
        const data = await usersController.userCheck( username, password );
        if(!data.success){
            logger.error(data.message)
            return done(null, false);
        }
        logger.info('User logged in successfully');
        return done(null,data.message);
    } catch(err) {
        logger.error("error ocurrido")
        return done(null, false);
    }
    
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, _password, done) => {
    try{
        const data = await usersController.userExists( username );
        if(data.success){
            logger.info('encontrado')
            return done(null, false);
        }

        const stageUser = await usersController.save(req.body);
        if(!stageUser.success){
            logger.error('Error creating user')
            return done(null, false);
        }
        const newUser = stageUser.message;
        logger.info('New user created successfully');

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