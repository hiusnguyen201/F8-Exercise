const model = require("../models");
module.exports = {
  login: (req, res) => {
    const error = req.flash("error");
    if (error[0] === "Missing credentials") {
      error[0] = "Vui lòng nhập đầy đủ thông tin";
    }
    res.render("auth/login", { error });
  },

  oauth: async (req, res) => {
    const { client_id, callback, scope } = req.query;
    const app = await model.App.findOne({
      where: {
        client_id,
        callback,
      },
    });

    if (!app) {
      res.status(400).json({
        status: "Error",
        message: "client id hoặc callback ko hợp lệ",
      });
      return;
    }

    res.status(200).json({
      status: "Success",
      message: "Tích hợp đăng nhập thành công",
    });
  },
};
