const permissionUtils = require("../utils/permission");
const model = require("../models/index");
const User = model.User;
const Role = model.Role;

module.exports = {
  index: async (req, res) => {
    if (!req.user) return;
    const permissions = await permissionUtils.getPermissions(req);
    req.app.locals.haveRead = permissions.includes("users.read");

    const { id } = req.user;
    const currUser = await User.findOne({
      where: { id },
      include: { model: Role },
    });
    const rolesObj = await currUser.getRoles();
    const rolesName = rolesObj.map((role) => role.name);
    req.app.locals.isAdmin = rolesName.includes("Admin");

    res.render("index", {
      title: req.user.name,
      haveRead: req.app.locals.haveRead,
      isAdmin: req.app.locals.isAdmin,
    });
  },
};
