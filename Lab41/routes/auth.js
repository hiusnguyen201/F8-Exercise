var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const passport = require("passport");

/* GET home page. */
router.get("/login", AuthController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    successRedirect: "/auth/otp",
  })
);

router.use(AuthMiddleware);
router.get("/otp", AuthController.otp);
router.post("/otp", AuthController.handleOtp);

module.exports = router;
