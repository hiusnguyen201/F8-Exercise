module.exports = {
  login: (req, res) => {
    const oauthInfo = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      callback: process.env.CALLBACK_URL,
      scopes: ["name", "email"],
    };

    const scopeStr = oauthInfo.scopes.join(",");
    res.render("auth/login", { oauthInfo, scopeStr });
  },
};
