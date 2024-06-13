const express = require("express");
const sendMoneyController = require("../controllers/sendMoney");
const { auth } = require("../middlewares/auth");
const sendMoneyRoutes = express.Router();
sendMoneyRoutes.post("/sendMoney", auth,sendMoneyController.createSendMoney);

module.exports = sendMoneyRoutes;
