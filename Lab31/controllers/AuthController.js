module.exports = {
    login: (req, res) => {
        res.render("auth/login");
    },

    logout: (req,res) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/auth/login');
        });
    }
}