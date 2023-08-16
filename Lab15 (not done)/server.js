const http = require("http");
let url = require("url");
const fs = require("fs");

const hostname = "localhost";
const port = 3000;

const home = require("./src/controllers/homeController");
const welcome = require("./src/controllers/welcomeController");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html ; charset=UTF-8");
    url = url.parse(req.url);

    const pattern = /\/*$/;
    const pathname = url.pathname.replace(pattern, "");

    if(req.url.indexOf("public") !== -1)
    {
        const ext = req.url.split(".").slice(-1).join();
        const contentTypes = {
            css: "text/css",
            png: "image/png",
            jpg: "image/jpg",
            js: "text/javascript",
        }

        res.setHeader("Content-Type", contentTypes[ext]);

        if(contentTypes[ext].includes("image/"))
        {
            fs.readFile("." + req.url, (err, content) => {
                res.end(content);
            })
        }
        else
        {
            fs.readFile("." + req.url, "utf8", (err, content) => {
                if(err?.errno === -4058)
                {
                    res.setStatus(404);
                    res.end();
                }

                res.end(content);
            })
        }
    }

    if(pathname === '' || pathname === '/')
    {   
        home.index(req, res);
    }
    else if (pathname === '/welcome')
    {
        welcome.index(req, res);
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})