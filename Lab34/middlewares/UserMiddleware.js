const permissionUtils = require("../utils/permission");
const model = require("../models/index");
const User = model.User;
const Role = model.Role;

module.exports = {
    haveAdd: async (req, res, next) => {
        const permissions = await permissionUtils.getPermissions(req);
        if(!permissions.includes("users.add")){
            res.redirect("/users");
            return;
        }
        next();
    },

    haveUpdate: async (req, res, next) => {
        const permissions = await permissionUtils.getPermissions(req);
        if(!permissions.includes("users.update")){
            res.redirect("/users");
            return;
        }
        next();
    },

    haveDelete: async (req, res, next) => {
        const permissions = await permissionUtils.getPermissions(req);
        if(!permissions.includes("users.delete")){
            res.redirect("/users");
            return;
        }
        next();
    },

    haveRead: async (req, res, next) => {
        const permissions = await permissionUtils.getPermissions(req);
        if(!permissions.includes("users.read")){
            res.redirect("/");
            return;
        }
        next();
    },

    isAdmin: async(req, res, next) => {
        if(!req.user) return;
        const { id } = req.user;
        const currUser = await User.findOne({
        where: { id },
        include: { model: Role },
        });
        const rolesObj = await currUser.getRoles();
        const rolesName = rolesObj.map((role) => role.name);
        if(!rolesName.includes("Admin")) {
            res.redirect("/users");
            return;
        }
        next();
    }
}