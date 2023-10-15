var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController');
const passport = require('passport');

const isLoggin = (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        res.redirect("/");
    }
    next();
}

router.get("/login", isLoggin ,AuthController.login);

router.get("/logout", AuthController.logout);

router.get("/github/redirect", passport.authenticate("github"));

router.get("/github/callback", passport.authenticate("github", { failureRedirect: '/login', failureMessage: true, successRedirect: "/" }));

router.get("/facebook/redirect", passport.authenticate("facebook"));

router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: '/login', failureMessage: true, successRedirect: "/" }));


module.exports = router;
