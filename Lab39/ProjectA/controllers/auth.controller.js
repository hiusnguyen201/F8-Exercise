module.exports = {
    login: (req, res) => {
        const error = req.flash("error");
        res.render("auth/login", { error });
    },

    logout: (req, res) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.clearCookie('token');
            res.redirect("/auth/login");
        });
    },
}