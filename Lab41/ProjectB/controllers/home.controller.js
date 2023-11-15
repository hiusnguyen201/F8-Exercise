module.exports = {
  index: async (req, res) => {
    if (!req.session.user) {
      res.redirect("/auth/login");
      return;
    }
    res.render("index", { user: req.session.user });
  },

  callback: async (req, res) => {
    const { code } = req.query;

    // Fetch 1
    try {
      const respond = await fetch("http://localhost:3000/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
        }),
      });

      if (respond.status !== 200) {
        console.log("Kiểm tra api");
        return;
      }

      const { data: accessToken } = await respond.json();
      // Fetch 2
      try {
        const respond = await fetch("http://localhost:3000/auth/authorize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: accessToken,
            client_secret: process.env.CLIENT_SECRET,
          }),
        });

        if (respond.status !== 200) {
          console.log("Kiểm tra api");
          return;
        }

        const { user } = await respond.json();
        req.session.user = user;
        res.redirect("/");
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
    return;
  },
};
