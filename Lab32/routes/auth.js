var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController');
const passport = require('passport');

const isLoggin = (req, res, next) => {
    if(req.user) {
      res.redirect("/");
    }
    next();
  }

router.get('/login', isLoggin, AuthController.login);
router.post('/login', passport.authenticate("local", { failureRedirect: "/auth/login", successRedirect: "/" ,failureFlash: true }));


router.get('/logout', AuthController.logout);
module.exports = router;
