var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');

const isLogout = (req, res, next) => {
    if(!req.user) {
        res.redirect("/auth/login");
    }
    next();
  }

/* GET users listing. */
router.get('/', isLogout, UserController.index);

router.get('/permission/:id',isLogout, UserController.permission);

router.post("/permission/:id", UserController.handlePermission)

module.exports = router;
