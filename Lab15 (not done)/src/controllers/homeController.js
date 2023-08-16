const Base = require('../common/Base');

class Home extends Base
{
    index = (req, res) => {
        this.render(req, res, "home");
    }
}

module.exports = new Home();