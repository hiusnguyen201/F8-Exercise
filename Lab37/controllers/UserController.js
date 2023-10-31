const SendMail = require("../jobs/SendMail");
const Event = require("../core/Event");
const model = require("../models/index");
const jwtUtils = require("../utils/jwt");

module.exports = {
  mail: async (req, res) => {
    const authorization = req.header("Authorization");
    const token = authorization.replace("Bearer", "").trim();
    try {
      const decoded = jwtUtils.decode(token);
      if (decoded) {
        const users = await model.User.findAll();

        users.forEach((user) => {
          new Event(
            new SendMail({
              email: user.email,
              name: user.name,
            })
          );
        });

        res.json({ status: "success" });
      }
    } catch (e) {
      res.status(401).json({
        status: "error",
        message: "Unauthorize",
      });
    }
  },
};
