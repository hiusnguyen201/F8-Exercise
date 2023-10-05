var express = require('express');
var router = express.Router();

const AccountController = require('../controllers/accountController');
const AccountValidator = require("../middlewares/accountValidator");
const LoginValidator = require("../middlewares/loginValidator");

router.get('/', AccountController.homeIndex);
router.get('/login', AccountController.loginIndex);
router.post('/login', LoginValidator(), AccountController.login);
router.get('/register', AccountController.registerIndex);
router.post('/register', AccountValidator(), AccountController.store);
router.post('/', AccountController.logout);

module.exports = router;
