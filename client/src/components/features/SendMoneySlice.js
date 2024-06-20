import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  educationLoan:false,
  transferFromCountry: "India",
  transferFromState: "",
  transferFromCity: "",
  transferToCountry: "",
  purposeOfTransfer: "",
  receivingCurrency: "",
  sendingCurrencyIn: "INR",
  receivingAmountInEuro: "",
  exchangeRate: "",
  receivingAmountInINR: "",
  oneEurotoINR: "",
  pancardNumber: "",
  pancardImage: "",
  addressProof: "",
  passportImage: "",
  blockACSheetDoc: "",
  remiterFirstName: "",
  remiterLastName: "",
  remiterAccountNo: "",
  remiterIFSCCode: "",
  remiterEmailID: "",
  remiterMobileNo: "",
  customerName: "",
  customerPassportImage: "",
  customerPassportNumber: "",
  placeOfIssue: "",
  issueDate: "",
  expireDate: "",
  beneficiaryName: "",
  beneficiaryAddress: "",
  beneficiaryAccountNo: "",
  beneficiaryAccountNoRe: "",
  beneficiarySwiftCode: "",
  bankIdentifiers: "",
  beneficiaryCountry: "",
};

const SendMoneySlice = createSlice({
  name: "SendMoneySlice",
  initialState,
  reducers: {
    setformValue: (state, action) => {
      const {
        educationLoan,
        transferFromState,
        transferFromCity,
        transferToCountry,
        purposeOfTransfer,
        oneEurotoINR,
        receivingAmountInEuro,
        exchangeRate,
        receivingAmountInINR,
        pancardNumber,
        pancardImage,
        remiterFirstName,
        remiterLastName,
        remiterAccountNo,
        remiterIFSCCode,
        remiterEmailID,
        remiterMobileNo,
        customerName,
        customerPassportImage,
        customerPassportNumber,
        placeOfIssue,
        issueDate,
        expireDate,
        beneficiaryName,
        beneficiaryAddress,
        beneficiaryAccountNo,
        beneficiaryAccountNoRe,
        beneficiarySwiftCode,
        bankIdentifiers,
        beneficiaryCountry,
        receivingCurrency,
        addressProof,
      } = action.payload;

      state.educationLoan=
      educationLoan!==undefined?educationLoan:state.educationLoan;
      state.addressProof =
        addressProof !== undefined ? addressProof : state.addressProof;
      state.transferFromState =
        transferFromState !== undefined
          ? transferFromState
          : state.transferFromState;
      state.transferFromCity =
        transferFromCity !== undefined
          ? transferFromCity
          : state.transferFromCity;
      state.oneEurotoINR =
        oneEurotoINR !== undefined ? oneEurotoINR : state.oneEurotoINR;
      state.receivingAmountInEuro =
        receivingAmountInEuro !== undefined
          ? receivingAmountInEuro
          : state.receivingAmountInEuro;
      state.exchangeRate =
        exchangeRate !== undefined ? exchangeRate : state.exchangeRate;
      state.receivingAmountInINR =
        receivingAmountInINR !== undefined
          ? receivingAmountInINR
          : state.receivingAmountInINR;
      state.pancardNumber =
        pancardNumber !== undefined ? pancardNumber : state.pancardNumber;
      state.pancardImage =
        pancardImage !== undefined ? pancardImage : state.pancardImage;
      state.remiterFirstName =
        remiterFirstName !== undefined
          ? remiterFirstName
          : state.remiterFirstName;
      state.remiterLastName =
        remiterLastName !== undefined ? remiterLastName : state.remiterLastName;
      state.remiterAccountNo =
        remiterAccountNo !== undefined
          ? remiterAccountNo
          : state.remiterAccountNo;
      state.remiterIFSCCode =
        remiterIFSCCode !== undefined ? remiterIFSCCode : state.remiterIFSCCode;
      state.remiterEmailID =
        remiterEmailID !== undefined ? remiterEmailID : state.remiterEmailID;
      state.remiterMobileNo =
        remiterMobileNo !== undefined ? remiterMobileNo : state.remiterMobileNo;
      state.customerName =
        customerName !== undefined ? customerName : state.customerName;
      state.customerPassportImage =
        customerPassportImage !== undefined
          ? customerPassportImage
          : state.customerPassportImage;
      state.customerPassportNumber =
        customerPassportNumber !== undefined
          ? customerPassportNumber
          : state.customerPassportNumber;
      state.placeOfIssue =
        placeOfIssue !== undefined ? placeOfIssue : state.placeOfIssue;
      state.issueDate = issueDate !== undefined ? issueDate : state.issueDate;
      state.expireDate =
        expireDate !== undefined ? expireDate : state.expireDate;
      state.beneficiaryName =
        beneficiaryName !== undefined ? beneficiaryName : state.beneficiaryName;
      state.beneficiaryAddress =
        beneficiaryAddress !== undefined
          ? beneficiaryAddress
          : state.beneficiaryAddress;
      state.beneficiaryAccountNo =
        beneficiaryAccountNo !== undefined
          ? beneficiaryAccountNo
          : state.beneficiaryAccountNo;
      state.beneficiaryAccountNoRe =
        beneficiaryAccountNoRe !== undefined
          ? beneficiaryAccountNoRe
          : state.beneficiaryAccountNoRe;
      state.beneficiarySwiftCode =
        beneficiarySwiftCode !== undefined
          ? beneficiarySwiftCode
          : state.beneficiarySwiftCode;
      state.bankIdentifiers =
        bankIdentifiers !== undefined ? bankIdentifiers : state.bankIdentifiers;
      state.beneficiaryCountry =
        beneficiaryCountry !== undefined
          ? beneficiaryCountry
          : state.beneficiaryCountry;
      state.transferToCountry =
        transferToCountry !== undefined
          ? transferToCountry
          : state.transferToCountry;
      state.purposeOfTransfer =
        purposeOfTransfer !== undefined
          ? purposeOfTransfer
          : state.purposeOfTransfer;
      state.receivingCurrency =
        receivingCurrency !== undefined
          ? receivingCurrency
          : state.receivingCurrency;
    },
  },
});

export const { reducer } = SendMoneySlice;
export const { setformValue } = SendMoneySlice.actions;
export default SendMoneySlice.reducer;
