module.exports = {
    login: (req, res) => {
        res.render("auth/login", { layout: "layouts/auth_layout" });
    },

    logout: (req, res) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }
}