module.exports = {
  index: (req, res) => {
    if (req.user.role === 1) {
      res.redirect("/apps");
    }

    res.render("index");
  },
};
