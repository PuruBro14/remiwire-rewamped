  import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setformValue } from "../../features/SendMoneySlice";
import axios from "axios";
import { uploadDocument } from "../../../services/operations/SendMoneyApi";

export default function SendMoneyForm2Customer({
  setFormStep,
  documentProof,
  setDocumentProofs,
}) {
  const [errors, setErrors] = useState({
    customerName: "",
    customerPassportImage: "",
    customerPassportNumber: "",
    placeOfIssue: "",
    issueDate: "",
    expireDate: "",
  });

  const [document, setDocument] = useState(null);

  const dispatch = useDispatch();
  const sendMoneyAboroadForms = useSelector(
    (state) => state.sendMoneyAboroadForms
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!sendMoneyAboroadForms.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!sendMoneyAboroadForms.customerPassportNumber.trim()) {
      newErrors.customerPassportNumber = "Customer Passport Number is required";
    }

    if (!sendMoneyAboroadForms.placeOfIssue.trim()) {
      newErrors.placeOfIssue = "Place Of Issue is required";
    }

    if (!sendMoneyAboroadForms.issueDate.trim()) {
      newErrors.issueDate = "Issue Date is required";
    }

    if (!sendMoneyAboroadForms.expireDate.trim()) {
      newErrors.expireDate = "Expire Date is required";
    }

  const issueDate = new Date(sendMoneyAboroadForms.issueDate);
  const expireDate = new Date(sendMoneyAboroadForms.expireDate);

  if (issueDate > expireDate) {
    newErrors.issueDate = "Issue Date cannot be after Expire Date";
  }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Upload the document first
        if (document) {
          const formData = new FormData();
          formData.append("customerPassportImage", document);
          formData.append("customerName", "Goku");
          formData.append("customerPassportNumber", "JFNPS4915B");
          formData.append("placeOfIssue", "LA");
          formData.append("issueDate", "1998-05-19");
          formData.append("expireDate", "1998-05-20");

          const uploadResponse = await uploadDocument(formData);
          console.log("Upload Response:", uploadResponse);
          if(uploadResponse?.uploaded_documents?.length>0){
          setFormStep(3);
          }
        } else {
          toast.error("Please select a document to upload");
          return;
        }
      } catch (error) {
        console.error("Error during document upload:", error);
        toast.error("Failed to upload document");
      }
    }
  };

  const clearError = (fieldName) => {
    setErrors({ ...errors, [fieldName]: "" });
  };

  const handleInputChange = (fieldName, value) => {
    const trimmedValue = value.replace(/\s/g, "");

    dispatch(setformValue({ [fieldName]: value }));
  };

  const handleSubmitChangeFormDoc = (fieldName, value) => {
    setDocumentProofs((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const clearErrorDoc = (fieldName) => {
    setErrors({ ...errors, [fieldName]: "" });
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
    setDocumentProofs((prevState) => ({
      ...prevState,
      customerPassportImage: e.target.files[0],
    }));
    clearError("customerPassportImage");
  };

  return (
    <div className="mt-10">
      <div className="mb-5 text-bold text-[18px]">Customer Details:</div>
      <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="customerName"
              id="customerName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={sendMoneyAboroadForms.customerName}
              onChange={(e) => {
                handleInputChange("customerName", e.target.value);
                clearError("customerName");
              }}
            />
            <label
              htmlFor="customerName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Customer Name
            </label>
            {errors.customerName && (
              <span className="text-[red] text-[11px] italic">
                {errors.customerName}
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="relative z-0 w-full mb-5 group">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Passport
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
                id="file_input"
                type="file"
                onChange={handleFileChange}
              />
              {errors.customerPassportImage && (
                <span className="text-[red] text-[11px] italic">
                  {errors.customerPassportImage}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="customerPassportNumber"
                id="customerPassportNumber"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={sendMoneyAboroadForms.customerPassportNumber}
                onChange={(e) => {
                  handleInputChange("customerPassportNumber", e.target.value);
                  clearError("customerPassportNumber");
                }}
              />
              <label
                htmlFor="customerPassportNumber"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Passport Number
              </label>
              {errors.customerPassportNumber && (
                <span className="text-[red] text-[11px] italic">
                  {errors.customerPassportNumber}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="placeOfIssue"
                id="placeOfIssue"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={sendMoneyAboroadForms.placeOfIssue}
                onChange={(e) => {
                  handleInputChange("placeOfIssue", e.target.value);
                  clearError("placeOfIssue");
                }}
              />
              <label
                htmlFor="placeOfIssue"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Place of Issue
              </label>
              {errors.placeOfIssue && (
                <span className="text-[red] text-[11px] italic">
                  {errors.placeOfIssue}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                name="issueDate"
                id="issueDate"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={sendMoneyAboroadForms.issueDate}
                onChange={(e) => {
                  handleInputChange("issueDate", e.target.value);
                  clearError("issueDate");
                }}
              />
              <label
                htmlFor="issueDate"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Issue Date
              </label>
              {errors.issueDate && (
                <span className="text-[red] text-[11px] italic">
                  {errors.issueDate}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                name="expireDate"
                id="expireDate"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={sendMoneyAboroadForms.expireDate}
                onChange={(e) => {
                  handleInputChange("expireDate", e.target.value);
                  clearError("expireDate");
                }}
              />
              <label
                htmlFor="expireDate"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Expire Date
              </label>
              {errors.expireDate && (
                <span className="text-[red] text-[11px] italic">
                  {errors.expireDate}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="text-gray-500 dark:text-gray-300"
            onClick={() => setFormStep(1)}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
