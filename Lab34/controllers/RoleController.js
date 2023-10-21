const permissionUtil = require("../utils/permission");
const model = require("../models/index");
const Role = model.Role;
const Permission = model.Permission;

module.exports = {
  index: async (req, res) => {
    const roles = await Role.findAll();
    const success = req.flash("success");
    res.render("roles/index", { roles, success });
  },

  add: async (req, res) => {
    res.render("roles/add");
  },

  handleAdd: async (req, res) => {
    // Phải validate
    // add là thêm dữ liệu đồng nghĩa phải có 2 instance role và permission
    // create là tạo mới và thêm dữ liệu vào bảng trung gian luôn

    const { name, permission } = req.body;

    const role = await Role.create({ name });
    if (permission) {
      let dataPermission = [];
      if (typeof permission === "string") {
        dataPermission.push({
          value: permission,
        });
      } else {
        dataPermission = permission.map((item) => ({ value: item }));
      }

      dataPermission.forEach(async (item) => {
        const permissionIn = await Permission.findOne({
          where: item,
        });

        if (!permissionIn) {
          await role.createPermission(item);
        } else {
          await role.addPermission(permissionIn);
        }
      });
    }

    req.flash("success", "Them role thanh cong !");
    res.redirect("/roles");
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const role = await Role.findOne({
      where: {
        id,
      },
      include: {
        model: Permission,
      },
    });

    const { Permissions: permissions } = role;

    const roles = await Role.findAll();

    res.render("roles/edit", { role, roles, permissions, permissionUtil });
  },

  handleEdit: async (req, res) => {
    const { id } = req.params;
    const { name, permission } = req.body;
    const role = await Role.findByPk(id);
    await role.update({ name });

    if (permission) {
      let dataPermission = [];
      if (typeof permission === "string") {
        dataPermission.push({
          value: permission,
        });
      } else {
        dataPermission = permission.map((item) => ({ value: item }));
      }

      dataPermission.forEach(async (item) => {
        const permissionIn = await Permission.findOne({
          where: item,
        });

        if (!permissionIn) {
          await role.createPermission(item);
        } else {
          const permissionUpdate = await Promise.all(
            dataPermission.map((item) => Permission.findOne({where: item})),
          );
            
          role.setPermissions(permissionUpdate);
        }
      });
    }

    res.redirect("/roles/edit/" + id);
  },

  delete: async (req, res) => {
    const { id } = req.params;

    // Lay role can xoa
    const role = await Role.findOne({where: {id}});

    // Xoa tat ca Permission lien quan den Role can xoa
    await role.removePermissions(await Permission.findAll());

    await Role.destroy({
      where: { id },
    })

    res.redirect("/roles")
  }
};
