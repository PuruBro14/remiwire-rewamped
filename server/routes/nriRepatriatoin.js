const express = require("express");
const NRIRepatriationController=require("../controllers/nriRepatriatoin")
const NRIRepatriationRoutes = express.Router();
NRIRepatriationRoutes.post(
  "/nriRepatriation",
  NRIRepatriationController.createNRIRepatriation
);

module.exports = NRIRepatriationRoutes;
