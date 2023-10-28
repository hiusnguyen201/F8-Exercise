const { check } = require("express-validator");
const bcrypt = require("bcrypt");
const model = require("../models/index");
const User = model.User;

module.exports = () => {
    return [
        check("email", "Vui lòng nhập email").notEmpty(),
        check("password", "Vui lòng nhập mật khẩu").notEmpty(),
        check("email", "Email không đúng định dạng").isEmail(),
        check("email").custom(async (value, {req}) => {
            const { password } = req.body;
            const user = await User.findOne({
                where: {
                    email: value,
                }
            })
            
            if(!user) {
                throw new Error("Vui lòng kiểm tra lại email hoặc password");
            }
            
            const hash = bcrypt.hashSync(password, 10);
            if(!bcrypt.compareSync(password, hash)) {
                throw new Error("Vui lòng kiểm tra lại email hoặc password");
            } 
        }),
    ]
}