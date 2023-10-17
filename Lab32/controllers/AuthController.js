module.exports = {
    login: (req, res) => {
        const error = req.flash("error");
        const oldEmail = req.flash("oldEmail");
        res.render("auth/login", {error, layout: false, oldEmail});
    },

    logout: (req, res, next) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/auth/login');
        });
    }
}