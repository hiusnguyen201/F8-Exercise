const fs = require("fs");
const path = require("path");
const cookie = require("cookie");
const serialize = require("serialize-javascript");
const data = require("../data/data.json");
const {
  replace,
  createSession,
  checkSession,
  destroySession,
  readSession,
} = require("../helpers");
/**
 * Returns the home page content based on the user's session
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {string} htmlContent - The HTML content
 */
function getHomeContent(req, res, htmlContent) {
  const { sessionId } = cookie.parse(req.headers?.cookie || "");
  let html = htmlContent;
  if (sessionId && checkSession(sessionId)) {
    const { data: sessionData } = readSession(sessionId);
    const task = sessionData?.task?.length
      ? JSON.stringify(sessionData.task)
      : JSON.stringify([]);
    res.setHeader("Set-Cookie", cookie.serialize("task", serialize(task)));
    return (html = replace(htmlContent, "content", data.todo));
  } else {
    if (sessionId && !checkSession(sessionId)) {
      destroySession(sessionId, res);
    }
    const newSessionId = createSession();
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("sessionId", newSessionId, { httpOnly: true })
    );
    return (html = replace(htmlContent, "content", data.start));
  }
}
/**
 * Serves the requested HTML page
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {string} pathView - The path to the views directory
 * @param {string} pathFile - The requested HTML file
 * @param {string} pathname - The requested page's path
 */
function htmlController(req, res, pathView, pathFile, pathname) {
  let htmlContent = fs.readFileSync(
    path.join(__dirname, pathView, pathFile),
    "utf-8"
  );
  if (pathname === "/" || pathname.startsWith("/index.htm"))
    htmlContent = getHomeContent(req, res, htmlContent);
  else {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    if (pathname.startsWith("/tutorial"))
      htmlContent = replace(htmlContent, "content", data.tutorial);
    else htmlContent = replace(htmlContent, "content", data.error);
    htmlContent = replace(htmlContent, "error", pathname.replace("/", ""));
  }
  res.end(htmlContent);
}

module.exports = htmlController;