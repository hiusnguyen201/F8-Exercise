var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');
const UserMiddleware = require("../middlewares/UserMiddleware");

/* GET users listing. */
router.get('/', UserMiddleware.haveRead ,UserController.index);

router.get('/add', UserMiddleware.haveAdd, UserController.add);
router.get('/update', UserMiddleware.haveUpdate, UserController.update);
router.get('/delete', UserMiddleware.haveDelete, UserController.delete);

router.get('/permission/:id', UserMiddleware.isAdmin, UserController.permission);

router.post("/permission/:id", UserController.handlePermission);

module.exports = router;
