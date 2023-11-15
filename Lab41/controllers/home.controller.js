const model = require("../models/index");
module.exports = {
  index: (req, res) => {
    res.render("index");
  },

  logout: (req, res) => {
    req.logout(async function (err) {
      if (err) {
        return next(err);
      }
      const token = req.cookies.token;
      await model.Login_Token.destroy({
        where: {
          token,
        },
      });
      res.clearCookie("token");
      res.redirect("/auth/login");
    });
  },
};
