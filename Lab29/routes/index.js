var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.index);
router.post('/', (req, res) => {
  const { logout } = req.body;
  if (logout) {
    authController.handleLogout(req, res);
  } else {
    authController.send(req, res);
  }
});
router.get('/track/:id', authController.handleStatus);

router.get('/mail/:id', authController.mail);

module.exports = router;
