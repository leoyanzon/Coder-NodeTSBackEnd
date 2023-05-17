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
            return done(null, false, {message: 'Passport: User not found'});
        }
        const checkPassword = await userServices.passwordCheck( username, password );
        if(!checkPassword){
            logger.error('Passport: wrong password')
            return done(null, false, {message: 'Passport: wrong password'});
        }
        const data = await userServices.getByUserName( username );
        if(!data){
            logger.error('Passport: User not found')
            return done(null, false, {message: 'Passport: User not found'});
        }
        logger.info(`Passport: user ${username} logged successfully`);
        return done(null,data, {message: 'Login successfull'});
    } catch(err) {
        logger.error(`Passport error: ${err}`)
        return done(null, false, {message: `Passport error: ${err}`});
    }
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, _password, done) => {
    try{
        const data = await userServices.userExists( username );
        if(data){
            logger.info(`Passport: user ${username} already exists`);
            return done(null, false, {message: `Passport: user ${username} already exists`});
        }
        const newUser = await userServices.append(req.body);
        if(!newUser){
            logger.error('Error appending new user')
            return done(null, false, {message: 'Error appending new user'});
        }
        logger.info(`Passport: new user created successfully`);

        await sendWhatsappAsync(`User ${newUser.username} created successfully`);
        await sendEmail(`Your user ${newUser.username} has created`, `User ${newUser.username} created successfully`, 'leoyanzon@gmail.com');
        
        done(null, newUser, {message: 'User created successfull'});
    } catch(err) {
        done(null, err, {message: `Passport error: ${err}`});
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