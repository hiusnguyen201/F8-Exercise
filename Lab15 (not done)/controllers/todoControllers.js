const fs = require("fs");
const cookie = require("cookie");
const serialize = require("serialize-javascript");
const { readSession, checkSession, getBody } = require("../helpers");
/**
 * This function handles all the requests to the /todo route
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
async function todoControllers(req, res) {
  const { sessionId } = cookie.parse(req.headers?.cookie || "");
  if (req.method === "POST") {
    if (sessionId && checkSession(sessionId)) {
      const task = await getBody(req);
      if (task && typeof task === "object") {
        const finalData = await addTask(sessionId, JSON.stringify(task));
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("task", serialize(JSON.stringify(finalData)))
        );
        res.end(JSON.stringify(finalData));
      } else {
        res.end("Task not found");
      }
    } else {
      destroySession(sessionId, res);
      res.end("Session not found");
    }
  } else if (req.method === "GET") {
    if (sessionId && checkSession(sessionId)) {
      const { data: sessionData } = readSession(sessionId);
      res.end(JSON.stringify(sessionData));
    } else {
      destroySession(sessionId, res);
      res.end("Session not found");
    }
  } else if (req.method === "DELETE") {
    if (sessionId && checkSession(sessionId)) {
      const task = await getBody(req);
      if (task && typeof task === "object") {
        const finalData = await deleteTask(sessionId, JSON.stringify(task));
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("task", serialize(JSON.stringify(finalData)))
        );
        res.end(JSON.stringify(finalData));
      }
    }
  } else if (req.method === "PUT") {
    if (sessionId && checkSession(sessionId)) {
      const task = await getBody(req);
      if (task && typeof task === "object") {
        const finalData = await editTask(sessionId, JSON.stringify(task));
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("task", serialize(JSON.stringify(finalData)))
        );
        res.end(JSON.stringify(finalData));
      } else {
        res.end("Task not found");
      }
    } else {
      destroySession(sessionId, res);
      res.end("Session not found");
    }
  } else {
    res.end("Method not allowed");
  }
}

const sessionDir = "./data/sessions";
/**
 * Adds a task to the session
 * @param {string} sessionId - The session ID
 * @param {string} taskObj - The task object
 */
async function addTask(sessionId, taskObj) {
  const sessionData = fs.readFileSync(
    `${sessionDir}/${sessionId}.json`,
    "utf-8"
  );
  const session = await JSON.parse(sessionData);
  const { data } = session;
  !data.task || data.task === []
    ? (data.task = [taskObj])
    : (data.task = [...data.task, taskObj]);
  fs.writeFileSync(`${sessionDir}/${sessionId}.json`, serialize(session));
  readSession(sessionId);
  return data.task;
}

/**
 * Destroys a session
 * @param {string} sessionId - The session ID
 * @param {object} res - The response object
 */

async function deleteTask(sessionId, taskObj) {
  const sessionData = fs.readFileSync(
    `${sessionDir}/${sessionId}.json`,
    "utf-8"
  );
  const session = await JSON.parse(sessionData);
  const { data } = session;
  const task = JSON.parse(`[${data.task}]`);
  const obj = JSON.parse(taskObj);
  const index = task.findIndex((item) => +item.id === +obj.id);
  data.task.splice(index, 1);
  fs.writeFileSync(`${sessionDir}/${sessionId}.json`, serialize(session));
  readSession(sessionId);
  return data.task;
}

/**
 *
 * @param {*} sessionId
 * @param {*} taskObj
 * @returns
 */
async function editTask(sessionId, taskObj) {
  const sessionData = fs.readFileSync(
    `${sessionDir}/${sessionId}.json`,
    "utf-8"
  );
  const session = await JSON.parse(sessionData);
  const { data } = session;
  const task = JSON.parse(`[${data.task}]`);
  const obj = JSON.parse(taskObj);
  const index = task.findIndex((item) => +item.id === +obj.id);
  data.task[index] = taskObj;
  fs.writeFileSync(`${sessionDir}/${sessionId}.json`, serialize(session));
  readSession(sessionId);
  return data.task;
}
module.exports = todoControllers;