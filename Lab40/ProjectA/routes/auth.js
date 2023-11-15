var express = require("express");
var router = express.Router();
const passport = require("passport");

const AuthController = require("../controllers/auth.controller");

router.get("/login", AuthController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/auth/login",
    successRedirect: "/",
  })
);

router.get("/oauth", AuthController.oauth);

module.exports = router;
