import { apiConnector } from "./apiconnector";
import {toast} from "react-hot-toast";

export const fetchFxRate = (
  receivingAmountInEuro,
  receivingCurrency,
  receivingAmountInINR,
  educationLoan
) => {
  return new Promise(async (resolve, reject) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/fx-rate`,
        {
          to_amount: receivingAmountInEuro,
          to_currency: "USD",
          from_amount: receivingAmountInINR,
          purpose: "EDUCATION",
          education_loan: educationLoan,
          customer_declaration: 0,
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
      return resolve.data;
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


export const registerRemitter = (token,formData) => {
  console.log('formData-------->',formData);
  return new Promise(async (resolve, reject) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/registerRemitter`,
        formData,
        {
          "x-client-id": import.meta.env.VITE_CLIENT_ID,
          "x-client-secret": import.meta.env.VITE_CLIENT_SECRET,
          "x-api-version": import.meta.env.VITE_API_VERSION,
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/registerBeneficiary`,
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
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/upload-document`,
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

