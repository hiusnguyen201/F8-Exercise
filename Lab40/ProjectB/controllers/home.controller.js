module.exports = {
  index: async (req, res) => {
    res.render("index");
  },

  login: async (req, res) => {
    try {
      const oauthApi = `http://localhost:3000/auth/oauth?client_id=${process.env.CLIENT_ID}&callback=${process.env.CALLBACK_URL}&scope=name,email`;
      const respond = await fetch(oauthApi);
      if (respond.status === 200) {
        res.redirect("http://localhost:3000/auth/login");
      }
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
};
