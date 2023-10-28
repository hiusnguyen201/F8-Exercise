var express = require("express");

const UserController = require("../controllers/UserController");
const fileMiddleware = require("../middlewares/fileMiddleware");
var router = express.Router();

/* GET users listing. */
router.get("/files", UserController.index);
router.get("/:id/files", UserController.profile);
router.post("/files", fileMiddleware, UserController.upload);

module.exports = router;
