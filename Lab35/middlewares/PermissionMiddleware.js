const model = require("../models/index");
const User = model.User;
const Token = model.Token;

module.exports = async (req, res, next) => {
    let { id } = req.body; 
    // Lấy ra id của người đăng nhập Sau đó gửi xác nhận = token đến gmail
    id = 2;
    const user = await User.findOne({
        where: {
            id: +id,
        },
        include: {
            model: Token,
        }
    });

    if(!user) {
        res.status(404).json({
            status: "error",
            error: "Không tìm thấy người dùng"
        });
        return;
    }

    const token = user.getToken();

    if(!token) {
        res.status(403).json({
            status: "error",
            error: "Người dùng ko có quyền sử dụng api"
        });
        return;
    }

    next();
}