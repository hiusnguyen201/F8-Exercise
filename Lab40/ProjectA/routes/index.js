var express = require("express");
var router = express.Router();

const HomeController = require("../controllers/home.controller");

router.get("/", HomeController.index);

module.exports = router;
