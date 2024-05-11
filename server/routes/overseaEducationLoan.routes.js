const express = require("express");
const overseaLoanEnquiryController = require("./controllers/overseaLoanEnquiry/createOverseaLoanEnquiry.controller");
const overSeaLoanRoutes = express.Router();

overSeaLoanRoutes.post(
  "/createInquiry",
  overseaLoanEnquiryController.createOverseaLoanEnquiry
);

module.exports = overSeaLoanRoutes;
