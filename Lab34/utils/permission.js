const model = require("../models/index");
const User = model.User;
const Role = model.Role;
const Permission = model.Permission;

module.exports = {
  get: (data, permission) => {
    const permissionData = data.find(({ value }) => value === permission);
    if (permissionData) {
      return permissionData.value;
    }
  },

  isRole: (roleData, roleId) => {
    return roleData.find((role) => {
      return +role.id === +roleId;
    });
  },

  getPermissions: async (req) => {
    if(!req.user) {
      return;
    }

    const { id } = req.user;
    const user = await User.findOne({
      where: { id },
      include: {
        model: Role,
      },
    });

    const roles = user.Roles; // Vi` roles la nhieu dung` promise
    // Lay tat ca permission cua tung role
    let permissions = await Promise.all(
      roles.map(async ({ id }) => {
        const role = await Role.findOne({
          where: { id },
          include: {
            model: Permission,
          },
        });

        return role.Permissions;
      })
    );

    permissions = permissions.map((item) => {
      return item.map(({ value }) => value);
    });

    return [...new Set(permissions.flat(Infinity))];
  },
};
