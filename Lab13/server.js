const hostname = 'localhost';
const port = 3600;
const http = require('http');
const home = require('./modules/home.js');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  let pathView = "index";
  const path = req.url;
  if(path === '/')
  {
    home.index(req, res);
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