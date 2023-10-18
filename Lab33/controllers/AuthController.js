const model = require("../models/index");
const Url = require("../utils/url");
const User = model.User;
const Link = model.Link;

module.exports = {
  login: (req, res) => {
    const error = req.flash("error");
    const oldEmail = req.flash("oldEmail");
    res.render("auth/login", { error, oldEmail});
  },

  home: async (req, res) => {
    const { id } = req.user;
    const error = req.flash("error");
    const linkList = await Link.findAll({
      where: {
        user_id: id,
      }
    });
    res.render("index", {user: req.user, linkList, error});
  },

  logout: (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
  },

  handleLink: async (req, res) => {
    const { url } = req.body;
    const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;
    const regex = new RegExp(pattern);

    if(!regex.test(url)) {
      req.flash("error", "Url không hợp lệ");
      res.redirect("/");
      return;
    }
    const link = await Link.findOne({
      where: {
        origin_url: url,
      }
    });

    if(link) {
      req.flash("error", "Url đã được rút gọn");
    } else {
      const shortenUrl = Url.shorten(url);
      const { id } = req.user;
      await Link.create({
        origin_url: url,
        shorten_url: shortenUrl,
        user_id: id,
      })
    }
    res.redirect("/");
  },

  updateViews: async(req, res) => {
    const { shortenLink } = req.params;
    const link = await Link.findOne({
      where: {
        shorten_url: shortenLink,
      }
    });

    if(link) {
      link.views++;
      await link.update({
        views: link.views,
      });
      res.redirect(link.origin_url);
    } else {
      res.redirect("/");
    }
  },

  destroyLink: async (req, res) => {
    const { shortenLink } = req.params;
    const link = await Link.findOne({
      where: {
        shorten_url: shortenLink,
      }
    });

    if(link) {
      await Link.destroy({
        where: {
          id: link.id,
        },
        force: true,
      });
    } 

    res.redirect("/");
  }
};
