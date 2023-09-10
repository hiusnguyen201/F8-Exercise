const htmlController = require("../controllers/htmlControllers.js");
const assetsController = require("../controllers/assetsControllers");
const todoController = require("../controllers/todoControllers");

const index = {
    assets: (req, res, pathname, pathView) => {
        if (req.method === "GET") {
            if (!pathname.startsWith("/assets/")) {
                pathname = pathname.slice(pathname.lastIndexOf("/assets/"));
            }
            assetsController(res, pathname, pathView);
        } else {
            res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Phương thức không được hỗ trợ");
        }

    },

    html: (req, res, pathView, pathFile, pathname) => {
        if (req.method === "GET") {
            htmlController(req, res, pathView, pathFile, pathname);
        } else {
            res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Phương thức không được hỗ trợ");
        }
    },

    todo: todoController,
};

module.exports = index;