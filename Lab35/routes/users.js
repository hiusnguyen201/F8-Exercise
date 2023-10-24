var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');
const UserMiddleware = require('../middlewares/UserMiddleware');

router.get('/', UserController.index);
router.get("/:id", UserController.view);
router.post("/", UserMiddleware(), UserController.store);
router.put("/:id", UserMiddleware(), UserController.replace);
router.patch("/:id", UserMiddleware(), UserController.modify);
router.delete("/:id", UserController.destroy);
module.exports = router;
