var express = require('express');
const AuthController = require('../controllers/AuthController');
var router = express.Router();

const isLogout = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

router.get('/', isLogout, AuthController.home);
router.post("/", AuthController.handleLink);

router.get("/update/:shortenLink", isLogout, AuthController.updateViews);

router.get("/destroy/:shortenLink", isLogout, AuthController.destroyLink);

module.exports = router;

