module.exports = {
    isLogin: (req, res, next) => {
        if (req.user) {
            res.redirect("/");
            return;
        }
        next();
    },

    isLogout: (req, res, next) => {
        if (!req.user) {
            res.redirect("/auth/login");
            return;
        }
        next();
    }
}