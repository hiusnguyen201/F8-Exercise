var express = require('express');
var router = express.Router();
const passport = require('passport');

const AuthController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");

router.get('/login', AuthMiddleware.isLogin, AuthController.login);
router.post('/login', passport.authenticate("local", {
    successRedirect: `/`,
    failureRedirect: "/auth/login",
    failureFlash: true,
}));

router.get("/logout", AuthMiddleware.isLogout, AuthController.logout);

module.exports = router;
