var express = require("express");
const permissionUtils = require("../utils/permission");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  if (req.user) {
    const permissions = await permissionUtils.getPermissions(req);
    req.app.locals.haveRead = permissions.includes("users.read");
    res.render('index', { title: 'Express', haveRead: req.app.locals.haveRead});
  }
});

module.exports = router;

/*
  Viet middleware de chheck route va permission tuong ung
  Viet ham check quyen => An hien cac button, menu tuong ung
*/
