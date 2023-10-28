const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const model = require("../models/index");
const User = model.User;

module.exports = {
  login: async (req, res) => {
    const { errors } = validationResult(req);
    if (errors?.length) {
      const errEmail = errors.find((err) => err.path === "email");
      const errPassword = errors.find((err) => err.path === "password");

      res.status(400).json({
        status: "Error",
        message: [errEmail, errPassword],
      });
      return;
    }

    const { email } = req.body;
    const { JWT_SECRET, JWT_EXPIRE } = process.env;
    const user = await User.findOne({ where: { email } });

    const token = jwt.sign(
      {
        data: {
          userId: user.id,
        },
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE * 60 }
    );

    res.json({
      status: "success",
      message: "Đăng nhập thành công",
      accessToken: token,
    });
  },

  profile: async (req, res) => {
    const user = await User.findByPk(req.userId);
    res.json({
      status: "success",
      data: user,
    });
  },
};
