const Base = require("../core/base.js");
const account = require("../modal/account.js");
const fs = require("fs");

class Home extends Base {
    add = (req, res) => {
        const method = req.method;

        if (method === 'GET') {
            this.render(req, res, "index");
        }
        else if (method === 'POST') {
            req.on("data", (buffer) => {
                const body = buffer.toString();
                const errors = {};
                let phone = "";

                if (body) {
                    const bodyObj = new URLSearchParams(body);
                    phone = bodyObj.get("phone");

                    if (!phone) {
                        errors.name = "Vui lòng nhập số điện thoại";
                    }
                    else if (!this.isNumberic(phone)) {
                        errors.name = "Số điện thoại chỉ chứa các ký tự số";
                    }
                    else if (phone.charAt(0) !== '0') {
                        errors.name = "Nên có một số không ở đầu";
                    }
                    else if (phone.charAt(1) === '0') {
                        errors.phone = "Số điện thoại không được có số 0 ở vị trí thứ hai";
                    }
                    else if (phone.length < 9 || phone.length > 11) {
                        errors.name = "Số điện thoại phải có từ 9 đến 11 ký tự";
                    }

                    const data = fs.readFileSync("./data/data.json");
                    const jsonData = JSON.parse(data);
                    jsonData.focus.phone = phone;
                    fs.writeFileSync("./data/data.json", JSON.stringify(jsonData));
                }

                if(Object.keys(errors).length === 0)
                {
                    const redirectUrl = '/account/' + encodeURIComponent(phone);
                    res.writeHead(302, { Location: redirectUrl });
                    res.end();
                }
                else
                {
                    this.render(req, res, "index", {
                        "error.name": errors.name ?? "",
                        "old.phone": phone,
                    });
                }
            });
        }
    };
}


module.exports = new Home();