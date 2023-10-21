const model = require("../models/index");
const { isRole, getPermissions, isInclude } = require("../utils/permission");
const User = model.User;
const Role = model.Role;

module.exports = {
  index: async (req, res) => {
    if(!req.user) return;
    const users = await User.findAll();
    const permissionList = await getPermissions(req);

    const { id } = req.user;
    const currUser = await User.findOne({
      where: { id },
      include: { model: Role },
    });
    const rolesObj = await currUser.getRoles();
    const rolesName = rolesObj.map((role) => role.name);
    res.render("users/index", { users, permissionList, isInclude, req, rolesName});
  },

  add: (req, res) => {
    res.send("Them thanh cong");
  },
  update: (req, res) => {
    res.send("Sua thanh cong");
  },
  delete: (req, res) => {
    res.send("Xoa thanh cong");
  },

  permission: async (req, res) => {
    const { id } = req.params;
    const roles = await Role.findAll();
    const user = await User.findOne({
      where: {
        id,
      },
      include: {
        model: Role,
      },
    });

    const msg = req.flash("msg");

    // Enhanced Literal Object
    res.render("users/permission", { roles, user, isRole, msg });
  },

  handlePermission: async (req, res) => {
    // const permission = req.body.permission; // Trùng name ở ejs
    // console.log(permission);
    let { roles } = req.body;
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    console.log(roles);
    if (!user) {
      res.redirect("/users");
      return;
    }

    if (roles) {
      roles = typeof roles === "string" ? [roles] : roles;

      const roleUpdate = await Promise.all(
        // Multi Promise (await thay then) (tham số truyền vào là mảng promise)
        roles.map(
          async (
            roleId // map trả về mảng promise
          ) =>
            await Role.findOne({
              where: { id: +roleId },
            })
        )
      );

      await user.setRoles(roleUpdate);
    } else {
      await user.setRoles(roles);
    }
    req.flash("msg", "Cap nhat thanh cong");
    res.redirect(`/users/permission/${id}`);
  },
};
