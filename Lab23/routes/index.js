var express = require('express');
var router = express.Router();

const LoginController = require('../controllers/loginController');
const HomeController = require('../controllers/homeController');

router.get("/", HomeController.index)
router.get("/dang-nhap", LoginController.index);
router.post("/dang-nhap", LoginController.handleLogin);
router.get("/", LoginController.index);
router.post("/", HomeController.handleLogout);

module.exports = router;