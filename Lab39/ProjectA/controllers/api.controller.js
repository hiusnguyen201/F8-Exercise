const model = require("../models/index");

module.exports = {
    profile: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({
                status: "Error",
                message: "Not Found"
            })
        }
        const user = await model.User.findByPk(+id, {
            attributes: ["id", "name", "email"]
        });

        if (!user) {
            res.status(400).json({
                status: "Error",
                message: "Bad Request"
            })
        }

        res.json({
            status: "success",
            user
        })
    }
}