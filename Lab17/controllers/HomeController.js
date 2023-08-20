const Banner = require("../models/bannerModel");
const Client = require("../models/clientModel");
const Image = require("../models/imageModel");
const Services = require("../models/serviceModel");

module.exports = {
    index: (req, res) => {
        const bannerList = Banner.getList();
        const clientList = Client.getList();
        const srcList = Image.getList(); 
        const servicesList = Services.getList();

        return res.render("home/index", { bannerList, clientList, srcList, servicesList});
    }
}