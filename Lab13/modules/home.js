const Base = require('../core/base.js');

class Home extends Base {
  index = (req, res) => {

    const data = {
      name: "place holder",
      description: "Hello",
      address: ["123 add, ress", "ha noi", "vietnam"],
      contact: {
        office: "123 add, ress",
        phone: "+1 234 567 890",
        email: "haha@email.com",
      },
      profiles: [
        "facebook",
        "twitter",
        "instagram",
        "linkedin",
        "stackoverflow",
        "github",
      ],
    };

    const name = 'place holder';

    this.renderHTML(req, res, "home", { data });
  };
}

module.exports = new Home();
