var express = require('express');
var router = express.Router();
const authController = require("../controllers/authController");

/* GET home page. */
router.get("/login", authController.login);
router.post("/login", (req, res) => {
    const { checkEmail } = req.body;
    if(!checkEmail) {
        authController.handleLogin(req, res);
    } else {
        authController.handleMail(req, res);
    }
});

module.exports = router;
