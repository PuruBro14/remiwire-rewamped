const express = require("express");
const contactController = require("../controllers/contactUs/contactus.controller");
const contactRouter = express.Router();

contactRouter.post("/contact-us", contactController.contactUsTemplate);

module.exports = contactRouter;
