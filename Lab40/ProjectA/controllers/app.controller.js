const model = require("../models/index");
const md5 = require("md5");
const sha1 = require("sha1");

module.exports = {
  index: async (req, res) => {
    if (!req.user.role) {
      res.redirect("/");
    }
    const success = req.flash("success");
    const apps = await model.App.findAll({
      where: {
        user_id: +req.user.id,
      },
    });
    res.render("apps/index", { success, apps });
  },

  create: (req, res) => {
    const error = req.flash("error");
    res.render("apps/new", { error });
  },

  handleCreate: async (req, res) => {
    const { name, homepage, callback } = req.body;

    // Validate tạm thời
    try {
      new URL(homepage);
    } catch {
      req.flash("error", "Homepage URL ko đúng định dạng");
      return res.redirect("/apps/new");
    }

    try {
      new URL(callback);
    } catch {
      req.flash("error", "Callback URL ko đúng định dạng");
      return res.redirect("/apps/new");
    }

    const ClientId = md5(new Date().getTime() + Math.random());
    // Xử lý
    const status = await model.App.create({
      name,
      user_id: +req.user.id,
      client_id: ClientId,
      callback,
      homepage,
    });

    if (!status) {
      req.flash("error", "Server Error, Tạo app ko thành công");
      res.redirect("/apps/new");
    }

    req.flash("success", "Tạo App thành công");
    res.redirect("/apps");
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const app = await model.App.findOne({
      where: {
        id,
        user_id: +req.user.id,
      },
    });

    const error = req.flash("error");
    const success = req.flash("success");

    if (!app) {
      res.redirect("/apps");
    }

    res.render("apps/edit", { app, user: req.user, error, success });
  },

  handleEdit: async (req, res) => {
    const { id } = req.params;
    const clientSecret = sha1(new Date().getTime() + Math.random());
    const status = await model.App.update(
      { client_secret: clientSecret },
      {
        where: { id },
      }
    );

    if (!status) {
      req.flash("error", "Server Error, Cap nhat ko thanh cong");
    } else {
      req.flash("success", "Cap nhat thanh cong");
    }

    res.redirect(`/apps/edit/${id}`);
  },
};
