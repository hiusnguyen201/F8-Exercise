const jwt = require("jsonwebtoken");
module.exports = {
    index: async (req, res) => {
        const token = req.cookies.token;

        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded) {
                    req.session.userId = decoded.data;
                }

                try {
                    const respond = await fetch(`http://localhost:3000/api/profile/${+req.session.userId}`);
                    if (respond.status === 200) {
                        const { user } = await respond.json();

                        res.render("index", { title: "Project B", user });
                    } else {
                        const error = {
                            status: 404, stack: null
                        };
                        res.render('error', { message: "Kiem tra lai link api", error });
                    }
                } catch (e) {
                    res.render('error', { message: e.message, error: e });
                }
            }
            res.render("index", { title: "Project B", user: null });
        } catch (e) {
            res.render('error', { message: e.message, error: e });
        }
    }
}