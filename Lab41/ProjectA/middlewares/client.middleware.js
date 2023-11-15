const models = require("../models/index");

module.exports = async (req, res, next) => {
  const { client_id, callback, scopes } = req.query;

  const app = await models.App.findOne({
    where: {
      client_id,
      callback,
    },
  });

  if (!app) {
    req.flash("error", "Client và callback không hợp lệ");
    res.redirect(
      `/auth/oauth?client_id=${client_id}&callback${callback}&scopes=${scopes}`
    );
  }

  next();
};
