var express = require('express');
var router = express.Router();

const ApiController = require("../controllers/api.controller");

router.get('/profile/:id', ApiController.profile);

module.exports = router;
