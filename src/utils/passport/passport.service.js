const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserServices = require('../../services/user/user.services');
const userServices = new UserServices();

const sendEmail = require('../../utils/nodeMailer/nodeMailer.service');
const sendWhatsappAsync = require('../../utils/twilio/whatsapp.services');

const { logger } = require('../../utils/logger/index');

passport.use('signin', new LocalStrategy(async(username, password, done) => {
    try{
        const checkUser = await userServices.userExists( username );
        if(!checkUser){
            logger.error('Passport: User not found')
            return done(null, false, {message: 'User not found'});
        }
        const checkPassword = await userServices.passwordCheck( username, password );
        if(!checkPassword){
            logger.error('Passport: User or password wrong')
            return done(null, false);
        }
        const data = await userServices.getByUserName( username );
        if(!data){
            logger.error('Passport: User not found')
            return done(null, false, {message: 'User not found'});
        }
        logger.info(`Passport: user ${username} logged successfully`);
        return done(null,data);
    } catch(err) {
        logger.error(`Passport error: ${err}`)
        return done(null, false, {message: 'Unknown error'});
    }
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, _password, done) => {
    try{
        const data = await userServices.userExists( username );
        if(data){
            logger.info(`Passport: user ${username} already exists`)
            return done(null, false, {message: 'User not found'});
        }
        const newUser = await userServices.append(req.body);
        if(!newUser){
            logger.error(`Passport error: ${err}`)
            return done(null, false, {message: 'Error appending new user'});
        }
        logger.info(`Passport: new user created successfully`);

        const whatsapp = await sendWhatsappAsync(`User ${newUser.username} created successfully`);
        if (whatsapp.success) logger.info(`Whatsapp message sent with sid:${whatsapp.message}`);
        const email = await sendEmail(`User ${newUser.username} created successfully`, 'leoyanzon@gmail.com');
        if (email.success) logger.info(`Email message sent:${email.message}`)

        done(null, newUser);
    } catch(err) {
        done(null, err, {message: 'Passport error found'});
    } 
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (_id, done) => {
    const userData = await userServices.getById( _id );
    done(null, userData);
})

module.exports = passport;