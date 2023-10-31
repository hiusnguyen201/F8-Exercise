const multer = require("multer");
const fs = require("fs");

module.exports = (req, res, next) => {
  const uploadFolder = "./public/files";

  if (!fs.existsSync(uploadFolder)) {
    try {
      fs.mkdirSync("./public/files");
    } catch (e) {
      return res.status(500).json({
        status: "error",
        error: e,
      });
    }
  } 
    
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
        error: err,
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({
        status: "error",
        error: err,
      });
    }
    next();
  });
};
