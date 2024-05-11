const mongoose = require("mongoose");

const sendMoneySchema = new mongoose.Schema({
  transferFromCountry: {
    type: String,
    required: true,
  },
  transferFromState: {
    type: String,
    required: true,
  },
  transferFromCity: {
    type: String,
    required: true,
  },
  transferToCountry: {
    type: String,
    required: true,
  },
  purposeOfTransfer: {
    type: String,
    trim: true,
    required: true,
  },
  receivingCurrency: {
    type: String,
    trim: true,
    required: true,
  },
  sendingCurrencyIn: {
    type: String,
    trim: true,
    required: true,
    default: "INR",
  },
  receivingAmountInEuro: {
    type: Number,
    trim: true,
    required: true,
  },
  receivingAmountInINR: {
    type: Number,
    trim: true,
    required: true,
  },
  oneEurotoINR: {
    type: Number,
    trim: true,
    required: true,
  },
  pancardNumber: {
    type: String,
    trim: true,
    required: true,
  },
  pancardImage: {
    type: String,
    trim: true,
    // required: true,
  },
  passportNumber: {
    type: String,
    trim: true,
    required: true,
  },
  passportImage: {
    type: String,
    trim: true,
    // required: true,
  },
  blockACSheetDoc: {
    type: String,
    trim: true,
    required: true,
  },
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
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("SendMoney", sendMoneySchema);
