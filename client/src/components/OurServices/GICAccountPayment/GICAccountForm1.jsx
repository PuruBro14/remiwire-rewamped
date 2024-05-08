import React, { useState, useEffect } from "react";
import { CitySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useSelector, useDispatch } from "react-redux";
import { setformValue } from "../../features/GICAccountSlice";
import axios from "axios";
export default function GICAccountForm1({ setformStep }) {
  const [countryid, setCountryid] = useState(101);
  const [stateid, setstateid] = useState(0);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    transferFromState: "",
    transferFromCity: "",
    receivingAmountInEuro: "",
    receivingAmountInINR: "",
  });
  const gicAccountForms = useSelector((state) => state.gicAccountForms);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!gicAccountForms?.transferFromState) {
      newErrors.transferFromState = "State is required";
    }

    if (!gicAccountForms?.transferFromCity) {
      newErrors.transferFromCity = "City is required";
    }

    if (!gicAccountForms?.receivingAmountInEuro) {
      newErrors.receivingAmountInEuro = "Amount in Euro is required";
    }

    if (!gicAccountForms?.receivingAmountInINR) {
      newErrors.receivingAmountInINR = "Amount in INR is required";
    }

    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      setformStep(1);
    }
  };
  // Clear error when input field is clicked
  const clearError = (fieldName) => {
    setErrors({ ...errors, [fieldName]: "" });
  };

  const handleInputChange = (fieldName, value) => {
    dispatch(setformValue({ [fieldName]: value }));
  };

  const getCurrentRateINRtoEURO = async () => {
    try {
      const response = await axios.get(
        "https://v6.exchangerate-api.com/v6/1902e21487d17680cb9fc088/latest/CAD"
      );
      const { INR } = response.data.conversion_rates;

      dispatch(setformValue({ oneEurotoINR: INR }));
      const inrValue = 11208 * gicAccountForms?.oneEurotoINR;
      handleInputChange("receivingAmountInINR", inrValue);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCurrentRateINRtoEURO();
  }, [gicAccountForms?.oneEurotoINR]);

  console.log('errors',errors);

  return (
    <>
      {" "}
      <div className="mt-10">
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <StateSelect
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
                handleInputChange("transferFromState", e.name);
                clearError("transferFromState");
              }}
              placeHolder="Select State"
            />
            {errors?.transferFromState && (
              <span className="text-[red] text-[11px] italic">
                {errors?.transferFromState}
              </span>
            )}

            <div className="mt-5">
              <CitySelect
                countryid={countryid}
                stateid={stateid}
                onChange={(e) => {
                  handleInputChange("transferFromCity", e.name);
                  clearError("transferFromCity");
                }}
                placeHolder="Select City"
              />
              {errors?.transferFromCity && (
                <span className="text-[red] text-[11px] italic">
                  {errors?.transferFromCity}
                </span>
              )}
            </div>
            <label
              htmlFor="studyCountry"
              className="peer-focus:font-medium absolute line text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              style={{ lineHeight: "0px" }}
            >
              Transfer From
            </label>
          </div>
          <div>
            <div>
              <div className="text-sm">Transfer To</div>
              <input
                type="text"
                readOnly={true}
                value={gicAccountForms?.transferToCountry}
                className="w-full border border-gray-300 rounded-[5px] text-gray p-1"
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="w-full mb-5 group">
              <div className="text-sm">Purpose</div>
              <input
                readOnly={true}
                value={gicAccountForms?.purposeOfTransfer}
                className="w-full border border-gray-300 rounded-[5px] text-gray p-1"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                readOnly={true}
                value={gicAccountForms?.receivingCurrency}
                name="courseDetails"
                id="course_details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                readOnly={true}
                value={gicAccountForms?.sendingCurrencyIn}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <div className="relative">
                <input
                  type="number"
                  className="block py-2.5 pr-10 pl-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 placeholder-black::placeholder"
                  value={gicAccountForms?.receivingAmountInEuro}
                  onChange={(e) => {
                    const inrValue =
                      e.target.value * gicAccountForms?.oneEurotoINR;
                    handleInputChange("receivingAmountInINR", inrValue);
                    handleInputChange("receivingAmountInEuro", e.target.value);
                    clearError("receivingAmountInINR");
                    clearError("receivingAmountInEuro");
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                {errors?.receivingAmountInEuro && (
                  <span className="text-[red] text-[11px] italic">
                    {errors?.receivingAmountInEuro}
                  </span>
                )}
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <div className="relative">
                <input
                  type="number"
                  name="courseDetails"
                  id="course_details"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                  value={gicAccountForms?.receivingAmountInINR}
                  onChange={(e) => {
                    const inputValue = parseFloat(e.target.value);
                    const eurValue = inputValue / gicAccountForms?.oneEurotoINR;
                    handleInputChange("receivingAmountInEuro", eurValue);
                    handleInputChange("receivingAmountInINR", inputValue);
                    clearError("receivingAmountInINR");
                    clearError("receivingAmountInEuro");
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <span className="text-gray-500">&#x20B9;</span>
                </div>
                {errors?.receivingAmountInINR && (
                  <span className="text-[red] text-[11px] italic">
                    {errors?.receivingAmountInINR}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="text-[11px] flex gap-2">
              *Note: For payment to German Bank account, transfer funds will be
              EUR 11208 + Bank Charges{" "}
              <div className="relative flex flex-col items-center group">
                <svg
                  className="w-5 h-5 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="absolute bottom-0 w-[300px] flex flex-col items-center hidden mb-5 group-hover:flex">
                  <span className="relative rounded-md z-10 p-4 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                    <p className="mt-2">
                      For Fintiba: EUR 11208 + 200 (Scotia charges for
                      certificate issuance) time: 7-10 days
                    </p>
                    <p className="mt-2">
                      For Expatrio: EUR 11208 + 200 (CIBC charges for
                      Certificate issuance) time: 2-3 working days
                    </p>
                    <p className="mt-2">
                      {" "}
                      For ICICI Germany: EUR 11208 + 150 (ICICI Bank Germany
                      charges for Certificate Issuance) time: 2-4 working days
                    </p>
                  </span>
                  <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-[30px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Book Order
          </button>
        </form>
      </div>
    </>
  );
}
