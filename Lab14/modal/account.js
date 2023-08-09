const fs = require('fs');
const Base = require('../core/base');

class Account extends Base {
    add = (req, res, phone) => {
        const method = req.method;

        if (method === "GET") 
        {
            this.render(req, res, "account", {
                "account.phone": `Account: ${phone}` ?? ""
            });
        }
        else if (method === "POST") 
        {
            req.on("data", (buffer) => {
                const body = buffer.toString();
                const errors = {};
                let otp = "";

                if(body) 
                {
                    const bodyObj = new URLSearchParams(body);
                    otp = bodyObj.get("otp")

                    const data = fs.readFileSync("./data/data.json");
                    const jsonData = JSON.parse(data);

                    if (jsonData.otp.includes(otp)) 
                    {
                        jsonData.active.push(jsonData.focus.phone);
                        fs.writeFileSync("./data/data.json", JSON.stringify(jsonData));
                    } 
                    else 
                    {
                        errors.name = "Mã OTP không hợp lệ";
                    }
                }

                if(Object.keys(errors).length === 0)
                {
                    const redirectUrl = '/success/' + encodeURIComponent(phone);
                    res.writeHead(302, { Location: redirectUrl });
                    res.end();
                }
                else
                {
                    this.render(req, res, "account", {
                        "error.name": errors.name ?? ""
                    })
                }
            });
        }
    }
}

module.exports = new Account();