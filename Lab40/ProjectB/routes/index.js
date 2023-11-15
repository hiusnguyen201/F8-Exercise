var express = require("express");
const HomeController = require("../controllers/home.controller");
var router = express.Router();

/* GET home page. */
router.get("/", HomeController.index);
router.post("/", HomeController.login);

module.exports = router;
