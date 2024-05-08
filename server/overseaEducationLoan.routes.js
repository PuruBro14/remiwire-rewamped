const express = require("express");
const overseaLoanEnquiryController = require("../controllers/createOverseaLoanEnquiry");
const overSeaLoanRoutes = express.Router();

overSeaLoanRoutes.post(
  "/createInquiry",
  overseaLoanEnquiryController.createOverseaLoanEnquiry
);

module.exports = overSeaLoanRoutes;
