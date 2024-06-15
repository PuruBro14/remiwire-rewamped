import { apiConnector } from "./apiconnector";
import {toast} from "react-hot-toast";

export const fetchFxRate = (
  transferFromState,
  transferFromCity,
  purposeOfTransfer,
  transferToCountry,
  receivingAmountInEuro,
  receivingAmountInINR,
  receivingCurrency
) => {
  return new Promise(async (resolve, reject) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:8100/api/v1/fx-rate",
        {
          to_amount: 100,
          to_currency: "USD",
          purpose: "EDUCATION",
          education_loan: true,
          customer_declaration: 500000,
          sender_pan_number: null,
        },
        {
          "Content-Type": "multipart/form-data",
          "x-client-id": import.meta.env.VITE_CLIENT_ID,
          "x-client-secret": import.meta.env.VITE_CLIENT_SECRET,
          "x-api-version": import.meta.env.VITE_API_VERSION,
        }
      );

      console.log("Response from FX rate API:", response.data);
      resolve(response.data);
      toast.dismiss(toastId);
      return resolve.data
    } catch (error) {
      console.error(
        "Error during FX rate fetch:",
        error.response?.data || error.message
      );
      reject(error);
    }
        toast.dismiss(toastId);
  });
};


export const registerRemitter = (token) => {
  return new Promise(async (resolve, reject) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:8100/api/v1/registerRemitter",
        {
          purpose: "EDUCATION",
          account_number: "011234567991234",
          ifsc: "SBIN0005943",
          pan: "ABCDE1234F",
          remitter_id: "prod_cf_rem_005",
          name: "Siddharth",
          address: "ABC street",
          phone_number: "9090909090",
          email: "abc@b.com",
          nationality: "IN",
          postal_code: "474005",
          state: "madhya pradesh",
          city: "gwalior",
          bank_code: "3003",
        },
        {
          "x-client-id": import.meta.env.VITE_CLIENT_ID,
          "x-client-secret": import.meta.env.VITE_CLIENT_SECRET,
          "x-api-version": import.meta.env.VITE_API_VERSION,
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("API Response:", response.data);
      toast.success("Remitter Created");
      resolve(response.data);
    } catch (error) {
      console.error("API Error:", error);
      toast.success("Remitter Already Exists");
      reject(error);
    } finally {
      toast.dismiss(toastId);
    }
  });
};


export const registerBeneficiary = (beneficiaryData) => {
  return new Promise(async (resolve, reject) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:8100/api/v1/registerBeneficiary",
        {
          beneficiary_id: "bene_004",
          account_holder_name: beneficiaryData.beneficiaryName,
          account_number: beneficiaryData.beneficiaryAccountNo,
          swift_code: beneficiaryData.beneficiarySwiftCode,
          iban: beneficiaryData.beneficiaryIBANNo,
          bank_name: "Silicon Valley Bank",
          bank_country: "US",
          bank_address: "003 Tasman Drive, Santa Clara",
          address: beneficiaryData.beneficiaryAddress,
          city: "Cambridge",
          state: "Massachusetts",
          country: "US",
          postal_code: "021384",
          routing_number: "121140399",
        },
        {
          "x-client-id": import.meta.env.VITE_CLIENT_ID,
          "x-client-secret": import.meta.env.VITE_CLIENT_SECRET,
          "x-api-version": import.meta.env.VITE_API_VERSION,
        }
      );

      console.log("API Response:", response.data);
      toast.success("Beneficiary Created");
      resolve(response.data);
    } catch (error) {
      console.error("API Error:", error);
      toast.success("Beneficiary Already Exists");
      reject(error);
    } finally {
      toast.dismiss(toastId);
    }
  });
};

export const uploadDocument = (formData) => {
  console.log("formData", formData);
  return new Promise(async (resolve, reject) => {
    const toastId = toast.loading("Uploading document...");
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:8100/api/v1/upload-document",
        formData,
        {
          "x-client-id": import.meta.env.VITE_CLIENT_ID,
          "x-client-secret": import.meta.env.VITE_CLIENT_SECRET,
          "x-api-version": import.meta.env.VITE_API_VERSION,
          "Content-Type": "multipart/form-data",
        }
      );

      console.log("API Response:", response.data);
      if (response.data.uploaded_documents.length>0){
        toast.success("Document uploaded successfully");
      }else{
        toast.error("Document not supported")
      }
      resolve(response.data);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to upload document");
      reject(error);
    } finally {
      toast.dismiss(toastId);
    }
  });
};

