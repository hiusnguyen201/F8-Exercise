const jwt = require("jsonwebtoken");

const model = require("../models/index");
const User = model.User;
const Token = model.Token;

module.exports = {
  index: (req, res) => {
    res.json({
      data: "Hello",
    });
  },

  create: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({
        status: "error",
        error: "Người dùng ko tồn tại",
      });
    }

    const tokenString = jwt.sign(
      {
        data: id,
      },
      "lab35"
    );

    const token = await Token.create({
      token: tokenString,
      user_id: id,
    });

    res.json({
      status: "success",
      data: token,
    });
  },

  revoke: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({
        status: "error",
        error: "Người dùng ko tồn tại",
      });
    }
    const token = await user.getToken();
    token.destroy();
    res.json({
        status: "success",
        msg: "Xoa Thanh cong",
      });
  }
};
