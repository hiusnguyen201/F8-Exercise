const jwt = require("jsonwebtoken");
module.exports = {
    index: (req, res) => {
        const token = req.cookies.token;

        try {
            let userId = null;
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded) {
                    req.session.user = decoded.data;
                }
            }

            res.render("index", { title: "Project B", user: req.session.user });
        } catch (e) {
            console.log(e);
            res.render('error');
        }
    },
}