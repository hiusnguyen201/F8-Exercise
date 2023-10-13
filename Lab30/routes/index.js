var express = require('express');
var router = express.Router();
const authController = require("../controllers/authController");

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.idLogged) {
    res.render("index", {title: "Home"});
  } else {
    res.redirect("/auth/login");
  }
});

router.get("/track/:token", (req, res) => {
  if(req.session.email) {
    authController.restore(req, res);
  } else {
    res.redirect("/auth/login");
  }
});
router.post("/track/:token", authController.handleRestore);

module.exports = router;
