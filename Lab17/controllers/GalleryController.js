const Image = require("../models/imageModel");

module.exports = {
    index: (req, res) => {
        const srcList = Image.getList(); 
        return res.render("parts/gallery", { srcList }); 
    }
}
