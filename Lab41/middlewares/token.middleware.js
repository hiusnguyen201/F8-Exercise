const models = require("../models/index");

module.exports = async (req, res, next) => {
  const tokenCookie = req.cookies.token;

  const tokenValid = await models.Login_Token.findOne({
    where: {
      token: tokenCookie ?? "",
      user_id: +req.user.id,
    },
  });

  if (req.user && !tokenValid) {
    await models.Login_Token.destroy({
      where: {
        user_id: +req.user.id,
      },
    });

    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
  }

  if (!tokenValid) {
    res.redirect("/auth/login");
    return;
  }

  next();
};
