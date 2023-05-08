const router = require('express').Router();

const passport = require('passport');

router.post('/signin', passport.authenticate('signin', {failureRedirect: '/error'}), async( _req, res) => {
    res.redirect('/');
})

router.post('/signup', passport.authenticate('signup', {failureRedirect: '/error'}), async( req, res) => {
    //uploader.single('profile-file')
    res.redirect('/');
})

router.get('/signout', (req, res) => {
    req.logout(()=> {
        res.redirect('/signin');
    })
})

module.exports = router;