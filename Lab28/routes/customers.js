var express = require('express');
var router = express.Router();

const CustomerController = require('../controllers/CustomerController');
const CustomerValidate = require('../middlewares/CustomerValidate');
const LoginValidate = require('../middlewares/LoginValidate');
const RegisterValidate = require('../middlewares/RegisterValidate');


router.get('/login', CustomerController.login);
router.post('/login', LoginValidate(), CustomerController.hanldeLogin);
router.get('/register', CustomerController.register);
router.post('/register', RegisterValidate(), CustomerController.handleSubmit);
router.get('/register/auth', CustomerController.auth);
router.post('/register/auth', CustomerController.handleToken);
router.get('/', CustomerController.index);
router.post('/', CustomerController.logout);
router.get('/create', CustomerController.create);
router.post('/create', CustomerValidate(), CustomerController.store);
router.get('/update/:id', CustomerController.update);
router.post('/update/:id', CustomerValidate(), CustomerController.handleUpdate);
router.post('/destroy/:id', CustomerController.destroy);
router.post('/destroyAll', CustomerController.destroyAll);

module.exports = router;
