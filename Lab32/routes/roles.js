var express = require('express');
var router = express.Router();

const RoleController = require('../controllers/RoleController');

const isLogout = (req, res, next) => {
    if(!req.user) {
        res.redirect("/auth/login");
    }
    next();
  }

router.get('/', isLogout, RoleController.index);

router.get('/add', isLogout, RoleController.add);
router.post('/add', RoleController.handleAdd);

router.get('/edit/:id', isLogout, RoleController.edit);
router.post('/edit/:id', RoleController.handleEdit);

module.exports = router;
