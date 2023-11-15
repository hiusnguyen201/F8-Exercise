var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const ClientMiddleware = require("../middlewares/client.middleware");
const passport = require("passport");

router.get("/login", AuthController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    successRedirect: "/auth/otp",
  })
);

router.get("/otp", AuthMiddleware, AuthController.otp);
router.post("/otp", AuthMiddleware, AuthController.handleOtp);

router.get("/oauth", AuthController.oauth);
router.post("/oauth", ClientMiddleware, AuthController.handleOauth);

router.post("/token", AuthController.handleCode);
router.post("/authorize", AuthController.handleAuthorize);

module.exports = router;
