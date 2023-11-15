var express = require("express");
const AuthController = require("../controllers/auth.controller");
var router = express.Router();

/* GET home page. */
router.get("/login", AuthController.login);

module.exports = router;
