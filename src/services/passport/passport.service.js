const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../mongo/models/user.model');

const BcryptService = require('../bcrypt/bcrypt.service');
const bcryptService = new BcryptService();


passport.use('signin', new LocalStrategy(async(username, password, done) => {
    const userData = await UserModel.findOne({username});
    const passwordChecked = await bcryptService.checkPassword(password, userData.password);
    if(!userData || !passwordChecked){
        return done(null, false);
    }
    return done(null,userData);
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    const userData = await UserModel.findOne({ username });
    if(userData){
        return done(null, false);
    }
    const stageUser = new UserModel({
        username,
        password: await bcryptService.hashPassword(password),
        fullName: req.body.fullName
    });
    const newUser = await stageUser.save();
    done(null, newUser);
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const userData = await UserModel.findById(id);
    done(null, userData);
})

module.exports = passport;