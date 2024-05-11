const mongoose = require("mongoose");

const loanEnquirySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    studyCountry: {
      type: String,
      required: true,
      trim: true,
    },
    countryCode: {
      type: Number,
      default: "91",
    },
    instituteName: {
      type: String,
      required: true,
      trim: true,
    },
    courseDetails: {
      type: String,
      required: true,
      trim: true,
    },
    parentName: {
      type: String,
      required: true,
      trim: true,
    },
    parentMobile: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const LoanEnquiryModel = mongoose.model(
  "overseasLoanEnquiry",
  loanEnquirySchema
);

module.exports = LoanEnquiryModel;
