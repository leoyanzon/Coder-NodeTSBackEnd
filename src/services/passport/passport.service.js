const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../mongo/models/user.model');

const EncryptService = require('../encrypt/encrypt.service');
const encryptService = new EncryptService();

const { logger } = require('../logger/index');

passport.use('signin', new LocalStrategy(async(username, password, done) => {
    try{
        const userData = await UserModel.findOne({username});
        logger.info('trying to check data')
        if(!userData){
            return done(null, false);
        }
        const passwordChecked = await encryptService.checkPassword('argon2', password, userData.password);
        if(!passwordChecked){
            return done(null, false);
        }
        return done(null,userData);
    } catch(err) {
        logger.error("error ocurrido")
        return done(null, false);
    }
    
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    try{
        const userData = await UserModel.findOne({ username });
        if(userData){
            logger.info('encontrado')
            return done(null, false);
        }
        
        const stageUser = new UserModel({
            username,
            password: await encryptService.hashPassword('argon2', password),
            fullName: req.body.fullName
        });
        logger.info('creacion nuevo usuario');
        const newUser = await stageUser.save();

        done(null, newUser);
    } catch(err) {
        done(null, false);
    }
    
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const userData = await UserModel.findById(id);
    done(null, userData);
})

module.exports = passport;