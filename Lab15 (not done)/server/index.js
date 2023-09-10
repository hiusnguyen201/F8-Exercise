const http = require("http");
const url = require("url");

const { html, assets, todo } = require("../model");

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let { pathname } = parsedUrl;
    if (pathname.includes("/assets/")) assets(req, res, pathname, "../views");
    else if (pathname === "/todo") todo(req, res);
    else html(req, res, "../views", "index.html", pathname);
  })
  .listen(3000);