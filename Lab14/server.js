const http = require('http');
let url = require('url');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const home = require('./modal/home.js');
const account = require('./modal/account.js');
const success = require('./modal/success.js');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (req.url === '/') {
        home.add(req, res);
    }
    else if(req.url.startsWith('/account/'))
    {
        const urlParts = req.url.split('/');
        if (urlParts.length === 3) {
            const phone = urlParts[2];
            account.add(req, res, phone);
        }
    }
    else if(req.url.startsWith('/success/'))
    {
        console.log(req.url);
        const urlParts = req.url.split('/');
        if (urlParts.length === 3) {
            const phone = urlParts[2];
            success.index(req, res, phone);
        }
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})