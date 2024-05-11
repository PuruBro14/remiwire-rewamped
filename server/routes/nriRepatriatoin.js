const express = require("express");
const NRIRepatriationController=require("../controllers/nriRepatriatoin")
const NRIRepatriationRoutes = express.Router();
console.log('routes error');
NRIRepatriationRoutes.post(
  "/nriRepatriation",
  NRIRepatriationController.createNRIRepatriation
);

module.exports = NRIRepatriationRoutes;
