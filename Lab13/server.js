const hostname = 'localhost';
const port = 3600;
const http = require('http');
const render = require('./modules/render.js');


const data = {
  "name": "place holder",
  "description": "Hello",
  "address": [
    "123 add, ress",
    "hai phong",
    "vietnam"
  ],
  "contact": {
    "office": "123 add, ress",
    "phone": "+1 234 567 890",
    "email": "haha@email.com"
  },
  "profiles": [
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "stackoverflow",
    "github"
  ]
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const path = req.url;
  if(path === '/')
  {
    render.renderHTML(req, res, './views/index.html', data);
  }
  else 
  {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})