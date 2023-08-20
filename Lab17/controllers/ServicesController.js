const Services = require("../models/serviceModel");

module.exports = {
    index: (req, res) => {
        const servicesList = Services.getList();
        return res.render("parts/services", { servicesList });
    }
}