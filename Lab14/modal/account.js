const fs = require('fs');
const Base = require('../core/base');

class Account extends Base {
    add = (req, res, phone) => {
        const method = req.method;
        console.log(method);
        if (method === "GET") {
            this.render(req, res, "account");
        }
        else if (method === "POST") {
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

                    if(jsonData.otp.includes(otp))
                    {
                        jsonData.active = jsonData.phone;
                    }
                    else
                    {
                        errors.name = "Mã OTP ko hợp lệ"
                    }
                    
                    
                    
                    this.render(req, res, "account", {
                        "error.name": errors.name ?? ""
                    })
                }
            });
        }
    }
}

module.exports = new Account();