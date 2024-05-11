const mongoose = require("mongoose");

const blockedAccountSchema = new mongoose.Schema({
    transferFromCountry: {
      type: String,
      required: true,
      trim: true,
    },
    transferFromState: {
      type: String,
      trim: true,
    },
    transferFromCity: {
      type: String,
      trim: true,
    },
    transferToCountry: {
      type: String,
      required: true,
      trim: true,
    },
  purposeOfTransfer: {
    type: String,
    trim: true,
    required: true,
  },
  currencyDetails: {
    receivingCurrency: {
      type: String,
      trim: true,
      required: true,
    },
    sendingCurrencyIn: {
      type: String,
      trim: true,
      default: "INR",
    },
  },
  amountDetails: {
    receivingAmountInEuro: {
      type: Number,
      required: true,
    },
    receivingAmountInINR: {
      type: Number,
      trim: true,
    },
    oneEurotoINR: {
      type: Number,
      trim: true,
    },
  },
  identificationDetails: {
    pancardNumber: {
      type: String,
      trim: true,
      required: true,
    },
    pancardImage: {
      type: String,
      trim: true,
      required: true,
    },
    passportNumber: {
      type: String,
      trim: true,
      required: true,
    },
    passportImage: {
      type: String,
      trim: true,
      required: true,
    },
    blockACSheetDoc: {
      type: String,
      trim: true,
      required: true,
    },
  },
  remitterDetails: {
    remiterFirstName: {
      type: String,
      trim: true,
      required: true,
    },
    remiterLastName: {
      type: String,
      trim: true,
      required: true,
    },
    remiterAccountNo: {
      type: String,
      trim: true,
      required: true,
    },
    remiterIFSCCode: {
      type: String,
      trim: true,
      required: true,
    },
    remiterEmailID: {
      type: String,
      trim: true,
      required: true,
    },
    remiterMobileNo: {
      type: String,
      trim: true,
      required: true,
    },
  },
  beneficiaryDetails: {
    beneficiaryName: {
      type: String,
      trim: true,
      required: true,
    },
    beneficiaryAddress: {
      type: String,
      trim: true,
      required: true,
    },
    beneficiaryAccountNo: {
      type: String,
      trim: true,
      required: true,
    },
    beneficiaryAccountNoRe: {
      type: String,
      trim: true,
      required: true,
    },
    beneficiarySwiftCode: {
      type: String,
      trim: true,
      required: true,
    },
    beneficiaryIBANNo: {
      type: String,
      trim: true,
      required: true,
    },
    beneficiaryCountry: {
      type: String,
      required: true,
      trim: true,
    },
  },
});

module.exports = mongoose.model("BlockedAccount", blockedAccountSchema);
