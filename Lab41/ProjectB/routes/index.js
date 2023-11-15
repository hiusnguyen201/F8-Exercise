var express = require("express");
const HomeController = require("../controllers/home.controller");
var router = express.Router();

/* GET home page. */
router.get("/callback", HomeController.callback);
router.get("/", HomeController.index);

module.exports = router;
