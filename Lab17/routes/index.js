var express = require('express');
var router = express.Router();

const HomeController = require('../controllers/HomeController');
const AboutController = require('../controllers/AboutController');
const GalleryController = require('../controllers/GalleryController');
const ServicesController = require('../controllers/ServicesController');
const ContactController = require('../controllers/ContactController');

router.get("/", HomeController.index);
router.get("/index.html", HomeController.index);
router.get("/about.html", AboutController.index);
router.get("/gallery.html", GalleryController.index);
router.get("/services.html", ServicesController.index);
router.get("/contact.hmtl", ContactController.index);

module.exports = router;
