const jwt = require("jsonwebtoken");

module.exports = {
    index: (req, res) => {
        const token = jwt.sign({
            data: req.user,
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRED })

        res.cookie("token", token);
        res.redirect(`http://localhost:3006/`);
    }
}