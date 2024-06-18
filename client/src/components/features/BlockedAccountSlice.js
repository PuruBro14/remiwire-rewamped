import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transferFromCountry: "India",
  transferFromState: "",
  transferFromCity: "",
  transferToCountry: "Germany",
  purposeOfTransfer: "Blocked Account Payment",
  receivingCurrency: "Euro",
  sendingCurrencyIn: "INR",
  receivingAmountInEuro: "11208",
  receivingAmountInINR: "",
  oneEurotoINR: "",
  pancardNumber: "",
  pancardimage: "",
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
  beneficiaryCountry: "Germany",
};

const blockedAccountSlice = createSlice({
  name: "blockedAccount",
  initialState,
  reducers: {
    setformValue: (state, action) => {
      const {
        transferFromState,
        transferFromCity,
        oneEurotoINR,
        receivingAmountInEuro,
        receivingAmountInINR,
        pancardNumber,
        pancardimage,
        passportNumber,
        passportImage,
        blockACSheetDoc,
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
      } = action.payload;

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
      state.pancardimage =
        pancardimage !== undefined ? pancardimage : state.pancardimage;
      state.passportNumber =
        passportNumber !== undefined ? passportNumber : state.passportNumber;
      state.passportImage =
        passportImage !== undefined ? passportImage : state.passportImage;
      state.blockACSheetDoc =
        blockACSheetDoc !== undefined ? blockACSheetDoc : state.blockACSheetDoc;
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
    },
  },
});

export const { reducer } = blockedAccountSlice;
export const { setformValue } = blockedAccountSlice.actions;
export default blockedAccountSlice.reducer;
