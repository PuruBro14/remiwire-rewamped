import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setformValue } from "../../features/SendMoneySlice";

export default function SendMoneyForm2({
  setformStep,
  setDocumentProofs,
  documentProof,
}) {
  const [errors, setErrors] = useState({
    pancardNumber: "",
    panCardImage: "",
    remiterFirstName: "",
    remiterLastName: "",
    remiterAccountNo: "",
    remiterIFSCCode: "",
    remiterEmailID: "",
    remiterMobileNo: "",
    passportNumber: "",
    passportImage: "",
  });

  const dispatch = useDispatch();
  const sendMoneyAboroadForms = useSelector(
    (state) => state.sendMoneyAboroadForms
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Example validations (replace with your actual validation logic)
    if (!sendMoneyAboroadForms.pancardNumber) {
      newErrors.pancardNumber = "PAN card number is required";
    }
    if (!sendMoneyAboroadForms.passportNumber) {
      newErrors.passportNumber =
        "Passport/Aadhar/Driving License number is required";
    }

    if (!documentProof.passportImage) {
      newErrors.passportImage = "Document is required";
    }

    if (!documentProof.panCardImage) {
      newErrors.panCardImage = "PAN card image is required";
    }

    if (!sendMoneyAboroadForms.remiterFirstName) {
      newErrors.remiterFirstName = "Remitter's first name is required";
    }

    if (!sendMoneyAboroadForms.remiterLastName) {
      newErrors.remiterLastName = "Remitter's last name is required";
    }

    if (!sendMoneyAboroadForms.remiterAccountNo) {
      newErrors.remiterAccountNo = "Remitter's account number is required";
    }

    if (!sendMoneyAboroadForms.remiterIFSCCode) {
      newErrors.remiterIFSCCode = "Remitter's IFSC code is required";
    }

    if (!sendMoneyAboroadForms.remiterEmailID) {
      newErrors.remiterEmailID = "Remitter's email ID is required";
    }

    if (!sendMoneyAboroadForms.remiterMobileNo) {
      newErrors.remiterMobileNo = "Remitter's mobile number is required";
    }

    // Update errors state
    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      setformStep(2); // Proceed to next step
    }
  };

  // Clear error when input field is clicked
  const clearError = (fieldName) => {
    setErrors({ ...errors, [fieldName]: "" });
  };

  const handleInputChange = (fieldName, value) => {
    const trimmedValue = value.replace(/\s/g, "");

    const sanitizedValue = trimmedValue.replace(/[^a-zA-Z0-9]/g, "");

    dispatch(setformValue({ [fieldName]: sanitizedValue }));
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
  return (
    <>
      <div className="mt-10">
        <div className="mb-5  text-bold text-[18px]">Remitter Details:</div>
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="courseDetails"
              id="course_details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={sendMoneyAboroadForms.pancardNumber}
              onChange={(e) => {
                handleInputChange("pancardNumber", e.target.value);
                clearError("pancardNumber");
              }}
            />

            <label
              htmlFor="course_details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              PAN Card Number
            </label>

            {errors.pancardNumber && (
              <span className="text-[red] text-[11px] italic">
                {errors.pancardNumber}
              </span>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Pan Card
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer "
                id="file_input"
                type="file"
                onChange={(e) => {
                  handleSubmitChangeFormDoc("panCardImage", e.target.files[0]);
                  clearErrorDoc("panCardImage");
                }}
              />{" "}
              {errors.panCardImage && (
                <span className="text-[red] text-[11px] italic">
                  {errors.panCardImage}
                </span>
              )}
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="courseDetails"
              id="course_details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={sendMoneyAboroadForms.passportNumber}
              onChange={(e) => {
                handleInputChange("passportNumber", e.target.value);
                clearError("passportNumber");
              }}
            />

            <label
              htmlFor="course_details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Passport / Aadhar Card / Driving License Number
            </label>
            {errors.passportNumber && (
              <span className="text-[red] text-[11px] italic">
                {errors.passportNumber}
              </span>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Document
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer "
                id="file_input"
                type="file"
                onChange={(e) => {
                  handleSubmitChangeFormDoc("passportImage", e.target.files[0]);
                  clearErrorDoc("passportImage");
                }}
              />
              {errors.passportImage && (
                <span className="text-[red] text-[11px] italic">
                  {errors.passportImage}
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
                value={sendMoneyAboroadForms.remiterFirstName}
                onChange={(e) => {
                  handleInputChange("remiterFirstName", e.target.value);
                  clearError("remiterFirstName");
                }}
              />

              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First Name
              </label>
              {errors.remiterFirstName && (
                <span className="text-[red] text-[11px] italic">
                  {errors.remiterFirstName}
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
                value={sendMoneyAboroadForms.remiterLastName}
                onChange={(e) => {
                  handleInputChange("remiterLastName", e.target.value);
                  clearError("remiterLastName");
                }}
              />
              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last Name
              </label>
              {errors.remiterLastName && (
                <span className="text-[red] text-[11px] italic">
                  {errors.remiterLastName}
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
                value={sendMoneyAboroadForms.remiterAccountNo}
                onChange={(e) => {
                  handleInputChange("remiterAccountNo", e.target.value);
                  clearError("remiterAccountNo");
                }}
              />

              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Account Number
              </label>
              {errors.remiterAccountNo && (
                <span className="text-[red] text-[11px] italic">
                  {errors.remiterAccountNo}
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
                value={sendMoneyAboroadForms.remiterIFSCCode}
                onChange={(e) => {
                  handleInputChange("remiterIFSCCode", e.target.value);
                  clearError("remiterIFSCCode");
                }}
              />
              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                IFSC Code
              </label>
              {errors.remiterIFSCCode && (
                <span className="text-[red] text-[11px] italic">
                  {errors.remiterIFSCCode}
                </span>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="courseDetails"
                id="course_details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => {
                  handleInputChange("remiterEmailID", e.target.value);
                  clearError("remiterEmailID");
                }}
              />

              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email ID
              </label>
              {errors.remiterEmailID && (
                <span className="text-[red] text-[11px] italic">
                  {errors.remiterEmailID}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                pattern="[0-9]{10}"
                id="course_details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => {
                  handleInputChange("remiterMobileNo", e.target.value);
                  clearError("remiterMobileNo");
                }}
              />
              <label
                htmlFor="course_details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mobile No
              </label>
              {errors.remiterMobileNo && (
                <span className="text-[red] text-[11px] italic">
                  {errors.remiterMobileNo}
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="mt-[30px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Proceed
          </button>
        </form>
      </div>
    </>
  );
}
