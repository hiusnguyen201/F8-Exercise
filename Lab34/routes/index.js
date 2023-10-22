var express = require("express");
var router = express.Router();
const HomeController = require("../controllers/HomeController");

/* GET home page. */
router.get("/", HomeController.index);

module.exports = router;

/*
  Viet middleware de chheck route va permission tuong ung
  Viet ham check quyen => An hien cac button, menu tuong ung
*/
