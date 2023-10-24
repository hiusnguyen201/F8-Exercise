const { validationResult } = require("express-validator");
const model = require("../models/index");
const User = model.User;

module.exports = {
  index: async (req, res) => {
    const { rows: users, count } = await User.findAndCountAll();

    res.json({
      status: "success",
      msg: "Danh sách người dùng",
      data: users,
      count,
    });
  },

  view: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        status: "error",
        error: "Not Found",
      });
      return;
    }

    res.json({
      status: "success",
      msg: "Chi tiết người dùng",
      data: user,
    });
  },

  store: async (req, res) => {
    const { errors } = validationResult(req);
    if (errors?.length) {
      res.status(400).json({
        status: "error",
        errors,
      });
      return;
    }

    const { name, email } = req.body;
    const user = await User.create({ name, email });
    if (user) {
      res.json({
        status: "success",
        msg: "Tạo người dùng thành công",
        data: user,
      });
    }
  },

  replace: async (req, res) => {
    const { errors } = validationResult(req);
    if (errors?.length) {
      res.status(400).json({
        status: "error",
        errors,
      });
      return;
    }

    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        status: "error",
        error: "Not Found",
      });
      return;
    }

    const { name = null, email = null } = req.body;
    const newUser = await user.update({ name, email, updatedAt: new Date() });
    res.json({
      status: "success",
      msg: "Cập nhật thông tin thành công",
      data: newUser,
    });
  },

  modify: async (req, res) => {
    const { errors } = validationResult(req);
    if (errors?.length) {
      res.status(400).json({
        status: "error",
        errors,
      });
      return;
    }

    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        status: "error",
        error: "Not Found",
      });
      return;
    }

    const { name, email } = req.body;
    const newUser = await user.update({ name, email, updatedAt: new Date() });
    res.json({
      status: "success",
      msg: "Cập nhật thông tin thành công",
      data: newUser,
    });
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        status: "error",
        error: "Not Found",
      });
      return;
    }

    await user.destroy({
        force: true
    });
    res.json({
        status: "success",
        msg: "Xóa người dùng thành công"
    })
  }
};
