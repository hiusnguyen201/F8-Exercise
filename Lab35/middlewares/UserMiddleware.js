const { check } = require("express-validator");

const model = require("../models/index");
const User = model.User;

module.exports = () => {
  return [
    check("name").custom((value, { req }) => {
      if (req.method === "POST") {
        if (!value) throw new Error("Tên bắt buộc phải nhập");
      }
      return true;
    }),
    check("email").custom((value, { req }) => {
      if (req.method === "POST") {
        if (!value) throw new Error("Email bắt buộc phải nhập");
      } else {
        if(value === "") {
            throw new Error("Email bắt buộc phải nhập");
        }
      }
      return true;
    }),
    check("email").custom((value) => {
      if (value) {
        const isMatch = value
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
        if (!isMatch) {
          throw new Error("Email ko đúng định dạng");
        }
      }
      return true;
    }),
    check("email").custom(async (value) => {
        if(value) {
            const user = await User.findOne({where: {email: value}});
            if(user) {
                throw new Error("Email đã có người sử dụng");
            }
        }
        return true;
    })
  ];
};
