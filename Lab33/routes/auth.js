var express = require("express");
var router = express.Router();
const passport = require("passport");

const AuthController = require("../controllers/AuthController");

const isLoggin = (req, res, next) => {
    if(!req.user) {
      next();
    } else {
      res.redirect("/");
    }
}

router.get("/login", isLoggin, AuthController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/",
    failureFlash: true,
  })
);

router.get("/logout", AuthController.logout);

module.exports = router;
