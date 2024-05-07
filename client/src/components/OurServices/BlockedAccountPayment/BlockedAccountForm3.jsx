import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setformValue } from "../../features/BlockedAccountSlice";

export default function BlockedAccountForm3({ documentProof }) {
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
  const blockeAccountForms = useSelector((state) => state.blockeAccountForms);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate beneficiaryName
    if (!blockeAccountForms.beneficiaryName.trim()) {
      newErrors.beneficiaryName = "Beneficiary name is required";
    }

    // Validate beneficiaryAddress
    if (!blockeAccountForms.beneficiaryAddress.trim()) {
      newErrors.beneficiaryAddress = "Beneficiary address is required";
    }

    // Validate beneficiaryAccountNo
    if (!blockeAccountForms.beneficiaryAccountNo.trim()) {
      newErrors.beneficiaryAccountNo = "Beneficiary account number is required";
    }

    // Validate beneficiaryAccountNoRe
    if (!blockeAccountForms.beneficiaryAccountNoRe.trim()) {
      newErrors.beneficiaryAccountNoRe =
        "Re-enter beneficiary account number is required";
    } else if (
      blockeAccountForms.beneficiaryAccountNo !==
      blockeAccountForms.beneficiaryAccountNoRe
    ) {
      newErrors.beneficiaryAccountNoRe = "Account numbers do not match";
    }

    // Validate beneficiarySwiftCode
    if (!blockeAccountForms.beneficiarySwiftCode.trim()) {
      newErrors.beneficiarySwiftCode = "Beneficiary SWIFT code is required";
    }

    // Validate beneficiaryIBANNo
    if (!blockeAccountForms.beneficiaryIBANNo.trim()) {
      newErrors.beneficiaryIBANNo = "Beneficiary IBAN number is required";
    }

    // Validate beneficiaryCountry
    if (!blockeAccountForms.beneficiaryCountry.trim()) {
      newErrors.beneficiaryCountry = "Beneficiary country is required";
    }

    // Update errors state
    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      setformStep(2); // Proceed to next step
    }
  };
  const clearError = (fieldName) => {
    setErrors({ ...errors, [fieldName]: "" });
  };

  const handleInputChange = (fieldName, value) => {
    dispatch(setformValue({ [fieldName]: value }));
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
                value={blockeAccountForms.beneficiaryCountry}
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
