import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transferFromCountry: "India",
  transferFromState: "",
  transferFromCity: "",
  transferToCountry: "",
  purposeOfTransfer: "",
  receivingCurrency: "",
  sendingCurrencyIn: "INR",
  receivingAmountInEuro: "",
  receivingAmountInINR: "",
  oneEurotoINR: "",
  pancardNumber: "",
  pancardImage: "",
  passportNumber: "",
  passportImage: "",
  blockACSheetDoc: "",
  remiterFirstName: "",
  remiterLastName: "",
  remiterAccountNo: "",
  remiterIFSCCode: "",
  remiterEmailID: "",
  remiterMobileNo: "",
  beneficiaryName: "",
  beneficiaryAddress: "",
  beneficiaryAccountNo: "",
  beneficiaryAccountNoRe: "",
  beneficiarySwiftCode: "",
  beneficiaryIBANNo: "",
  beneficiaryCountry: "",
};

const SendMoneySlice = createSlice({
  name: "SendMoneySlice",
  initialState,
  reducers: {
    setformValue: (state, action) => {
      const {
        transferFromState,
        transferFromCity,
        transferToCountry,
        purposeOfTransfer,
        oneEurotoINR,
        receivingAmountInEuro,
        receivingAmountInINR,
        pancardNumber,
        pancardImage,
        remiterFirstName,
        remiterLastName,
        remiterAccountNo,
        remiterIFSCCode,
        remiterEmailID,
        remiterMobileNo,
        beneficiaryName,
        beneficiaryAddress,
        beneficiaryAccountNo,
        beneficiaryAccountNoRe,
        beneficiarySwiftCode,
        beneficiaryIBANNo,
        beneficiaryCountry,
        receivingCurrency,
        passportNumber,
      } = action.payload;

      state.passportNumber =
        passportNumber !== undefined ? passportNumber : state.passportNumber;
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
      state.beneficiaryIBANNo =
        beneficiaryIBANNo !== undefined
          ? beneficiaryIBANNo
          : state.beneficiaryIBANNo;
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
