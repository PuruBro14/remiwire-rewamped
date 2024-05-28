import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setformValue } from "../../features/SendMoneySlice";
import axios from "axios";

export default function SendMoneyForm3({ setformStep,documentProof }) {
  const [errors, setErrors] = useState({
    beneficiaryName: "",
    beneficiaryAddress: "",
    beneficiaryAccountNo: "",
    beneficiaryAccountNoRe: "",
    beneficiarySwiftCode: "",
    beneficiaryIBANNo: "",
    beneficiaryCountry: "",
  });

  const dispatch = useDispatch();
  const sendMoneyAboroadForms = useSelector(
    (state) => state.sendMoneyAboroadForms
  );

  const handleSubmit = async(e) => {
    e.preventDefault();

        console.log('sendMoneyAboroadForms',sendMoneyAboroadForms);
        
        const{beneficiaryName,beneficiaryAddress,beneficiaryAccountNo,beneficiaryAccountNoRe,beneficiarySwiftCode,beneficiaryIBANNo,beneficiaryCountry}=sendMoneyAboroadForms

    const newErrors = {};

    // Validate beneficiaryName
    if (!sendMoneyAboroadForms.beneficiaryName.trim()) {
      newErrors.beneficiaryName = "Beneficiary name is required";
    }

    // Validate beneficiaryAddress
    if (!sendMoneyAboroadForms.beneficiaryAddress.trim()) {
      newErrors.beneficiaryAddress = "Beneficiary address is required";
    }

    // Validate beneficiaryAccountNo
    if (!sendMoneyAboroadForms.beneficiaryAccountNo.trim()) {
      newErrors.beneficiaryAccountNo = "Beneficiary account number is required";
    }

    // Validate beneficiaryAccountNoRe
    if (!sendMoneyAboroadForms.beneficiaryAccountNoRe.trim()) {
      newErrors.beneficiaryAccountNoRe =
        "Re-enter beneficiary account number is required";
    } else if (
      sendMoneyAboroadForms.beneficiaryAccountNo !==
      sendMoneyAboroadForms.beneficiaryAccountNoRe
    ) {
      newErrors.beneficiaryAccountNoRe = "Account numbers do not match";
    }

    // Validate beneficiarySwiftCode
    if (!sendMoneyAboroadForms.beneficiarySwiftCode.trim()) {
      newErrors.beneficiarySwiftCode = "Beneficiary SWIFT code is required";
    }

    // Validate beneficiaryIBANNo
    if (!sendMoneyAboroadForms.beneficiaryIBANNo.trim()) {
      newErrors.beneficiaryIBANNo = "Beneficiary IBAN number is required";
    }

    // Validate beneficiaryCountry
    if (!sendMoneyAboroadForms.beneficiaryCountry.trim()) {
      newErrors.beneficiaryCountry = "Beneficiary country is required";
    }

    // Update errors state
    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8100/beneficiaries', {"beneficiary_id":"bene_004","account_holder_name":beneficiaryName,"account_number":beneficiaryAccountNo,"swift_code":beneficiarySwiftCode,"iban":beneficiaryIBANNo,"bank_name":"Silicon Valley Bank","bank_country":"US","bank_address":"003 Tasman Drive, Santa Clar","address":beneficiaryAddress,"city":"Cambridge","state":"Massachusetts","country":"US","postal_code":"021384","routing_number":"121140399"}, {
          headers: {
            'x-client-id': import.meta.env.VITE_CLIENT_ID,
        'x-client-secret': import.meta.env.VITE_CLIENT_SECRET,
        'x-api-version': import.meta.env.VITE_API_VERSION
          }
        });

        console.log('API Response:', response.data);
      } catch (error) {
        console.error('API Error:', error);
      }
    }

        setformStep(4);
  };
  const clearError = (fieldName) => {
    setErrors({ ...errors, [fieldName]: "" });
  };

  const handleInputChange = (fieldName, value) => {
    const trimmedValue = value.replace(/\s/g, "");

    const sanitizedValue = trimmedValue.replace(/[^a-zA-Z0-9]/g, "");

    dispatch(setformValue({ [fieldName]: sanitizedValue }));
  };

  return (
    <>
      {" "}
      <div className="mt-10">
        <div className="mb-5  text-bold text-[18px]">Beneficiary Details:</div>
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
          <div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="courseDetails"
                id="course_details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={sendMoneyAboroadForms.beneficiaryName}
                onChange={(e) => {
                  handleInputChange("beneficiaryName", e.target.value);
                  clearError("beneficiaryName");
                }}
              />

              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Beneficiary Name
              </label>
              {errors.beneficiaryName && (
                <span className="text-[red] text-[11px] italic">
                  {errors.beneficiaryName}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="courseDetails"
                id="course_details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={sendMoneyAboroadForms.beneficiaryAddress}
                onChange={(e) => {
                  handleInputChange("beneficiaryAddress", e.target.value);
                  clearError("beneficiaryAddress");
                }}
              />

              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Beneficiary Address
              </label>
              {errors.beneficiaryAddress && (
                <span className="text-[red] text-[11px] italic">
                  {errors.beneficiaryAddress}
                </span>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="courseDetails"
                id="course_details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={sendMoneyAboroadForms.beneficiaryAccountNo}
                onChange={(e) => {
                  handleInputChange("beneficiaryAccountNo", e.target.value);
                  clearError("beneficiaryAccountNo");
                }}
              />

              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Beneficiary Account no
              </label>
              {errors.beneficiaryAccountNo && (
                <span className="text-[red] text-[11px] italic">
                  {errors.beneficiaryAccountNo}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="courseDetails"
                id="course_details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={sendMoneyAboroadForms.beneficiaryAccountNoRe}
                onChange={(e) => {
                  handleInputChange("beneficiaryAccountNoRe", e.target.value);
                  clearError("beneficiaryAccountNoRe");
                }}
              />
              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Reconfirm Beneficiary Account no
              </label>
              {errors.beneficiaryAccountNoRe && (
                <span className="text-[red] text-[11px] italic">
                  {errors.beneficiaryAccountNoRe}
                </span>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="courseDetails"
                id="course_details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={sendMoneyAboroadForms.beneficiarySwiftCode}
                onChange={(e) => {
                  handleInputChange("beneficiarySwiftCode", e.target.value);
                  clearError("beneficiarySwiftCode");
                }}
              />

              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Swift Code
              </label>
              {errors.beneficiarySwiftCode && (
                <span className="text-[red] text-[11px] italic">
                  {errors.beneficiarySwiftCode}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="courseDetails"
                id="course_details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={sendMoneyAboroadForms.beneficiaryIBANNo}
                onChange={(e) => {
                  handleInputChange("beneficiaryIBANNo", e.target.value);
                  clearError("beneficiaryIBANNo");
                }}
              />
              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                IBAN No
              </label>
              {errors.beneficiaryIBANNo && (
                <span className="text-[red] text-[11px] italic">
                  {errors.beneficiaryIBANNo}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="courseDetails"
                id="course_details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                readOnly={true}
                value={sendMoneyAboroadForms.beneficiaryCountry}
              />
              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Country
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="mt-[30px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Proceed to checkout
          </button>
        </form>
      </div>
    </>
  );
}
