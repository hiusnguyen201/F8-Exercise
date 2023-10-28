const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { JWT_SECRET } = process.env;
  const authorization = req.header("authorization");
  if (!authorization) {
    return res.status(400).json({
      status: "error",
      message: "Vui lòng nhập access token",
    });
  }

  const token = authorization.replace("Bearer", "").trim();
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded) {
      const { userId } = decoded.data;
      req.userId = userId;
      next();
    }
  } catch (e) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorize",
    });
  }
};
