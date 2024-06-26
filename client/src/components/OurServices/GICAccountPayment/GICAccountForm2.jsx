import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setformValue } from "../../features/GICAccountSlice";
import { fetchFxRate, registerRemitter } from "../../../services/operations/SendMoneyApi";
import { apiConnector } from "../../../services/operations/apiconnector";

export default function GICAccountForm2({
  setFormStep,
  setDocumentProofs,
  documentProof,
  fetchFxDetails
}) {
  const {token}=useSelector((state)=>state.auth)
  const [errors, setErrors] = useState({
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
  });

  const dispatch = useDispatch();
  const gicAccountForms = useSelector((state) => state.gicAccountForms);
  
  const [getRemitterDetails, setGetRemiiterDetails] = useState([]);

  function isValidPAN(pan) {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
}

  const handleSubmit = async(e) => {
    e.preventDefault();

    const {
    purposeOfTransfer,
    remiterAccountNo,
    remiterIFSCCode,
    pancardNumber,
    remiterFirstName,
    transferToCountry,
    receivingAmountInEuro,
    receivingAmountInINR,
    receivingCurrency,
    remiterMobileNo,
    remiterEmailID,
    transferFromState,
    addressProof,
    transferFromCity,
  } = gicAccountForms;

    const newErrors = {};

    if (!gicAccountForms.pancardNumber) {
    newErrors.pancardNumber = "PAN card number is required";
  } else if (!isValidPAN(gicAccountForms.pancardNumber)) {
    newErrors.pancardNumber = "Invalid PAN card number format";
  }

    if (!documentProof.pancardimage) {
      newErrors.pancardimage = "PAN card document is required";
    }

    if (!documentProof.passportImage) {
      newErrors.passportImage = "Document is required";
    }

    if (!documentProof.blockACSheetDoc) {
      newErrors.blockACSheetDoc = "Block AC sheet document is required";
    }

    if (!gicAccountForms.remiterFirstName) {
      newErrors.remiterFirstName = "Remitter's first name is required";
    }

    if (!gicAccountForms.remiterLastName) {
      newErrors.remiterLastName = "Remitter's last name is required";
    }

    if (!gicAccountForms.remiterAccountNo) {
      newErrors.remiterAccountNo = "Remitter's account number is required";
    }

    if (!gicAccountForms.remiterIFSCCode) {
      newErrors.remiterIFSCCode = "Remitter's IFSC code is required";
    }

    if (!gicAccountForms.remiterEmailID) {
      newErrors.remiterEmailID = "Remitter's email ID is required";
    }

    if (!gicAccountForms.remiterMobileNo) {
      newErrors.remiterMobileNo = "Remitter's mobile number is required";
    }

    // Update errors state
    setErrors(newErrors);

    // If no errors, submit the form
   if (Object.keys(newErrors).length === 0) {
    const fetchFxRatePromise = fetchFxRate(
      transferFromState,
      transferFromCity,
      purposeOfTransfer,
      transferToCountry,
      receivingAmountInEuro,
      receivingAmountInINR,
      receivingCurrency
    );

    const registerRemitterPromise = registerRemitter(token);

    try {
      const [fxRateResult, remitterResult] = await Promise.all([
        fetchFxRatePromise.catch(error => ({ error })),
        registerRemitterPromise.catch(error => ({ error }))
      ]);

      if (!fxRateResult.error) {
        console.log('response', fxRateResult);
        fetchFxDetails(fxRateResult);
      } else {
        console.error("Error in fetchFxRate:", fxRateResult.error);
      }

      if (!remitterResult.error) {
        console.log("Remitter registered successfully");
      } else {
        console.error("Error in registerRemitter:", remitterResult.error);
      }
    } catch (error) {
      console.error("Unexpected error during form submission:", error);
    } finally {
      setFormStep(2)
    }
  }

  };

  // Clear error when input field is clicked
  const clearError = (fieldName) => {
    setErrors({ ...errors, [fieldName]: "" });
  };

  const handleInputChange = (fieldName, value) => {
    // const trimmedValue = value.replace(/\s/g, "");

    // const sanitizedValue = trimmedValue.replace(/[^a-zA-Z0-9]/g, "");

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

  const fetchRemiiterDetails = async (token, dispatch, setGetRemiiterDetails) => {
  try {
    const response = await apiConnector("GET", "http://13.50.14.42:8100/api/v1/remitters/prod_cf_rem_005", null, {
      Authorization: `Bearer ${token}`,
    });

    console.log('response',response);

    console.log("data", response?.data);
    const { name, account_number, ifsc, email, phone_number } = response?.data;
    dispatch(
      setformValue({
        remiterFirstName: name,
        remiterAccountNo: account_number,
        remiterIFSCCode: ifsc,
        remiterMobileNo: phone_number,
        remiterEmailID: email,
      })
    );
    setGetRemiiterDetails(response?.data);
  } catch (err) {
    console.error("Error fetching remitter details:", err);
  }
};

  useEffect(() => {
    fetchRemiiterDetails(token,dispatch,setGetRemiiterDetails);
  }, []);

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
              value={gicAccountForms.pancardNumber}
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
                  handleSubmitChangeFormDoc("pancardimage", e.target.files[0]);
                  clearErrorDoc("pancardimage");
                }}
              />{" "}
              {errors.pancardimage && (
                <span className="text-[red] text-[11px] italic">
                  {errors.pancardimage}
                </span>
              )}
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="course_details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address Proof
            </label>
            <select
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => {
                handleInputChange("addressProof", e.target.value);
                clearError("addressProof");
              }}
            >
              <option value="">--Select Address Proof--</option>
              <option>Aadhar Card</option>
              <option>Passport</option>
              <option>Driving License</option>
            </select>

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
                Upload Passport
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
          <div className="relative z-0 w-full mb-5 group">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Block A/C Instruction Sheet
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer "
                id="file_input"
                type="file"
                onChange={(e) => {
                  handleSubmitChangeFormDoc(
                    "blockACSheetDoc",
                    e.target.files[0]
                  );
                  clearErrorDoc("blockACSheetDoc");
                }}
              />
              {errors.blockACSheetDoc && (
                <span className="text-[red] text-[11px] italic">
                  {errors.blockACSheetDoc}
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
                value={gicAccountForms.remiterFirstName}
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
                value={gicAccountForms.remiterLastName}
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
                value={gicAccountForms.remiterAccountNo}
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
                value={gicAccountForms.remiterIFSCCode}
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
                value={gicAccountForms.remiterEmailID}
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
                value={gicAccountForms.remiterMobileNo}
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
