const path = require("path");
const multer = require("multer");

module.exports = (req, res, next) => {
  const uploadFolder = path.join(path.dirname(__dirname), "public", "files");
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage }).single("file");
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({
        status: "error",
        error: err
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({
        status: "error",
        error: err
      });
    }
    next();
  });
};
