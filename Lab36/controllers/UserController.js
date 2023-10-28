const model = require("../models/index");
const User = model.User;
const File = model.File;

module.exports = {
  index: async (req, res) => {
    const userApi = await User.findByPk(req.userId);
    if (!userApi) {
      return {
        status: "error",
        code: 400,
        message: "Không tìm thấy user",
      };
    }

    const files = await File.findAll();
    res.json({
      status: "success",
      data: files,
    });
  },

  profile: async (req, res) => {
    const userApi = await User.findByPk(req.userId);
    if (!userApi) {
      return res.status(400).json({
        status: "error",
        message: "Không tìm thấy user",
      });
    }

    const { id } = req.params;
    const userData = await User.findByPk(id);
    if (!userData) {
      return res.status(400).json({
        status: "error",
        message: "User ko tồn tại",
      });
    }

    const files = await File.findAll({
        where: {
            user_id: id,
        },
    });

    res.json({
      status: "success",
      data: files,
    });
  },

  upload: async (req, res) => {
    const userApi = await User.findByPk(req.userId);
    if (!userApi) {
      return res.status(400).json({
        status: "error",
        message: "Không tìm thấy user",
      });
    }

    // Lấy từ form
    const fileReq = req.file;
    if (!fileReq) {
      return res.status(400).json({
        error: "Error",
        message: "Chưa upload file",
      });
    }
    const { path, originalname, size, mimetype } = fileReq;

    const fileCreated = await File.findOne({
      where: {
        name: originalname,
        user_id: userApi.id,
      },
    });
    if (fileCreated) {
      return res.status(400).json({
        status: "Error",
        message: "File bị trùng tên",
      });
    }

    const file = await File.create({
      url: path,
      name: originalname,
      size: size,
      type: mimetype,
      user_id: userApi.id,
    });

    if (!file) {
      return res.status(500).json({
        status: "Error",
        message: "Không tạo được file",
      });
    }

    res.json({
      status: "Success",
      data: file,
    });
  },
};
