const fs = require("fs");
const { v4 } = require("uuid");
const serialize = require("serialize-javascript");

const replace = (htmlContent, value, content) => {
  const regex = new RegExp(`{${value}}`, "gi");
  return htmlContent.replaceAll(regex, content);
};

const getBody = (req) => {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        const body = JSON.parse(data);
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
  });
};

const sessionDir = "./data/sessions";

if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir);

function now() {
  return new Date().toLocaleString();
}

function createSession() {
  const sessionId = v4();
  const sessionData = {
    token: sessionId,
    lastAccessed: now(),
    data: {},
  };
  const sessionPath = `${sessionDir}/${sessionId}.json`;
  fs.writeFileSync(sessionPath, serialize(sessionData));
  return sessionId;
}

function readSession(sessionId) {
  const sessionPath = `${sessionDir}/${sessionId}.json`;
  try {
    const sessionData = fs.readFileSync(sessionPath, "utf-8");
    const session = JSON.parse(sessionData);
    session.lastAccessed = now();
    fs.writeFileSync(sessionPath, serialize(session));
    return session;
  } catch (error) {
    return {};
  }
}

function destroySession(sessionId, res) {
  const sessionPath = `${sessionDir}/${sessionId}.json`;
  if (fs.existsSync(sessionPath)) {
    fs.unlinkSync(sessionPath);
  }
  res.setHeader("Set-Cookie", `sessionId=;`);
}

function checkSession(sessionId, res) {
  if (!fs.existsSync(`${sessionDir}/${sessionId}.json`)) {
    return false;
  }
  return true;
}

module.exports = {
  getBody,
  replace,
  createSession,
  readSession,
  destroySession,
  checkSession,
};