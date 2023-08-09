const Base = require("../core/base");

class Success extends Base
{
    index = (req, res, phone) => {
        const method = req.method;

        if (method === 'GET') {
            this.render(req, res, "success", {
                "success.mess" : `Your phone: ${phone} is active !`
            });
        }
    }
}

module.exports = new Success();