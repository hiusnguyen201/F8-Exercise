var express = require('express');
var router = express.Router();

const CustomerController = require('../controllers/CustomerController');
const CustomerValidate = require('../middlewares/CustomerValidate');
const UpdateValidate = require('../middlewares/UpdateValidate');

router.get('/', CustomerController.index);
router.get('/create', CustomerController.create);
router.post('/create', CustomerValidate(), CustomerController.store);
router.get('/update', CustomerController.update);
router.post('/update', UpdateValidate(), CustomerController.updateStore);
router.post('/', CustomerController.delete);

module.exports = router;
