const fs = require("fs");
const path = require("path");
/**
 * Serves static assets from the public directory
 * @param {object} res - The response object
 * @param {string} pathname - The requested asset's path
 * @param {string} pathView - The path to the public directory
 */
const assetsController = (res, pathname, pathView) => {
  let assetsContent = "";
  if (pathname.includes(".css"))
    res.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
  else if (pathname.includes(".js"))
    res.writeHead(200, {
      "Content-Type": "text/javascript; charset=utf-8",
    });
  else if (pathname.includes(".ico"))
    res.writeHead(200, { "Content-Type": "image/x-icon" });
  else res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

  assetsContent = fs.readFileSync(path.join(__dirname, pathView + pathname));
  res.end(assetsContent);
};

module.exports = assetsController;