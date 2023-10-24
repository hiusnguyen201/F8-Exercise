var express = require('express');
var router = express.Router();

const TokenController = require("../controllers/TokenController");

router.get("/", TokenController.index);
router.post("/:id", TokenController.create);
router.delete("/:id", TokenController.revoke);

module.exports = router;
