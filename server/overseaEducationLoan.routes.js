const express = require("express");
const overseaLoanEnquiryController = require("../controllers/overseaLoanEnquiry");
const overSeaLoanRoutes = express.Router();

overSeaLoanRoutes.post(
  "/createInquiry",
  overseaLoanEnquiryController.createOverseaLoanEnquiry
);

module.exports = overSeaLoanRoutes;
