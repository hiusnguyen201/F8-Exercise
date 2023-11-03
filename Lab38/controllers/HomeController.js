const { v4: uuid } = require('uuid');
const fs = require("fs");
const model = require("../models/index");

module.exports = {
    index: async (req, res) => {
        let data = [];
        
        try {
            const status = fs.existsSync("./cache");
            if(!status) {
                fs.mkdirSync("./cache");
            }
        } catch (e) {
            console.log(e);
        }

        if (!req.cookies.usersCache) {
            const id = uuid();
            data = await model.User.findAll();
            try {
                fs.writeFileSync(`./cache/${id}`, JSON.stringify(data));
                res.cookie("usersCache", id, { maxAge: 900000, httpOnly: true });
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const buffer = fs.readFileSync(`./cache/${req.cookies.usersCache}`);
                if (buffer) {
                    data = JSON.parse(buffer.toString('utf8'));
                }
            } catch (e) {
                console.log(e);
            }
        }

        res.render("index", { title: "Danh sách người dùng", data });
    }
}