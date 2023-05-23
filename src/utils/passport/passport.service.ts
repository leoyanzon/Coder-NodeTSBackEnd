import { Request } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
const localStrategy = LocalStrategy.Strategy;

import UserServices from '../../services/user/user.services';
const userServices = new UserServices();
import { UserInterface } from '../../dao/dto/user.dto';

import sendEmail from '../../utils/nodeMailer/nodeMailer.service';
import sendWhatsappAsync from '../../utils/twilio/whatsapp.services';

import { logger } from '../../utils/logger/index';

passport.use('signin', new localStrategy(async(username : string, password : string, done) => {
    try{
        const checkUser : boolean = await userServices.userExists( username );
        if(!checkUser){
            logger.error('Passport: User not found')
            return done(null, false, {message: 'Passport: User not found'});
        }
        const checkPassword : boolean = await userServices.passwordCheck( username, password );
        if(!checkPassword){
            logger.error('Passport: wrong password')
            return done(null, false, {message: 'Passport: wrong password'});
        }
        const data : UserInterface = await userServices.getByUserName( username );
        if(!data){
            logger.error('Passport: User not found')
            return done(null, false, {message: 'Passport: User not found'});
        }
        logger.info(`Passport: user ${username} logged successfully`);
        return done(null,data, {message: 'Login successfull'});
    } catch(err : any) {
        logger.error(`Passport error: ${err}`)
        return done(null, false, {message: `Passport error: ${err}`});
    }
}));

passport.use('signup', new localStrategy({
    passReqToCallback: true
}, async (req : Request, username : string, _password : string, done) => {
    try{
        const checkUser : boolean = await userServices.userExists( username );
        if(checkUser){
            logger.info(`Passport: user ${username} already exists`);
            return done(null, false, {message: `Passport: user ${username} already exists`});
        }
        const newUser : UserInterface = await userServices.append(req.body);
        if(!newUser){
            logger.error('Error appending new user')
            return done(null, false, {message: 'Error appending new user'});
        }
        logger.info(`Passport: new user created successfully`);

        await sendWhatsappAsync(`User ${newUser.username} created successfully`);
        await sendEmail(`Your user ${newUser.username} has created`, `User ${newUser.username} created successfully`, 'leoyanzon@gmail.com');
        
        done(null, newUser, {message: 'User created successfull'});
    } catch(err : any) {
        done(null, err, {message: `Passport error: ${err}`});
    } 
}))

passport.serializeUser((user : any, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (_id, done) => {
    const userData : UserInterface = await userServices.getById( _id );
    done(null, userData);
})

export default passport;