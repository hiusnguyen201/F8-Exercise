const Base = require("../common/Base");

class Welcome extends Base
{
    index = (req, res) => {
        this.render(req, res, "welcome");
    }
}

module.exports = new Welcome();