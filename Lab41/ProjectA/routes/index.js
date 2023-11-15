var express = require("express");
var router = express.Router();
const HomeController = require("../controllers/home.controller");

// const token = md5(new Date().getTime() + Math.random());
// const token2 = sha1(new Date().getTime() + Math.random());

/* GET home page. */
router.get("/", HomeController.index);
router.get("/logout", HomeController.logout);

module.exports = router;
