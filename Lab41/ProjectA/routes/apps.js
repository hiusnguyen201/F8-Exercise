var express = require("express");
const AppController = require("../controllers/app.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", AppController.index);
router.get("/new", AppController.create);
router.post("/new", AppController.handleCreate);
router.get("/edit/:id", AppController.edit);
router.post("/edit/:id", AppController.handleEdit);

module.exports = router;
