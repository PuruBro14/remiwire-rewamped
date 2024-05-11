const express = require("express");
const sendMoneyController = require("../controllers/sendMoney");
const sendMoneyRoutes = express.Router();
console.log("routes error");
sendMoneyRoutes.post("/sendMoney", sendMoneyController.createSendMoney);

module.exports = sendMoneyRoutes;
