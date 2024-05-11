const express = require("express");
const blockedAccountController = require("../controllers/blockedAccount");
const blockedAccountRoutes = express.Router();
blockedAccountRoutes.post(
  "/blockedAccount",
  blockedAccountController.createBlockedAccount
);

module.exports = blockedAccountRoutes;
