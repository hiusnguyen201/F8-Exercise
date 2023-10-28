var express = require('express');
var router = express.Router();

const AuthController = require("../controllers/AuthController");
const accessTokenMiddkeware = require("../middlewares/accessTokenMiddkeware");
const authMiddleware = require("../middlewares/authMiddleware");

/* GET home page. */
router.post('/login', authMiddleware(), AuthController.login);
router.get("/profile", accessTokenMiddkeware, AuthController.profile);

module.exports = router;
