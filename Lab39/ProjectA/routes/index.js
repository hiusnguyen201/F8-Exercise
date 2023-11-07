var express = require('express');
var router = express.Router();

const HomeController = require("../controllers/home.controller");
const AuthMiddleware = require('../middlewares/auth.middleware');

router.get('/', AuthMiddleware.isLogout, HomeController.index);

module.exports = router;
