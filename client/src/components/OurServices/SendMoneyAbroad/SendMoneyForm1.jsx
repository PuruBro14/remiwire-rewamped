import React, { useState, useEffect } from "react";
import { CitySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useSelector, useDispatch } from "react-redux";
import { setformValue } from "../../features/SendMoneySlice";
import axios from "axios";
import countriesList from "../../../utils/countryList";
import currencyWithSymbol from "../../../utils/currencyWithSymbol";
import SignUp from "../../pages/Signup";
import { fetchFxRate } from "../../../services/operations/SendMoneyApi";

export default function SendMoneyForm1({
  setFormStep,
  isLoggedIn,
  setIsLoggedIn,
  getLoggedInData,
  setShowLoginModal,
  getShowModalData,
  fetchChargesData
}) {
  const [countryid, setCountryid] = useState(101);
  const [stateid, setstateid] = useState(0);
  const [selectedCurrencySymbol, setselectedCurrencySymbol] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile);

  const [errors, setErrors] = useState({
    transferFromState: "",
    transferFromCity: "",
    purposeOfTransfer: "",
    transferToCountry: "",
    receivingAmountInEuro: "",
    receivingAmountInINR: "",
    receivingCurrency: "",
  });
  const sendMoneyAboroadForms = useSelector(
    (state) => state.sendMoneyAboroadForms
  );

const handleSubmit = (e) => {
    e.preventDefault();


    const newErrors = {};

    if (!sendMoneyAboroadForms.transferFromState) {
      newErrors.transferFromState = "State is required";
    }

    if (!sendMoneyAboroadForms.transferFromCity) {
      newErrors.transferFromCity = "City is required";
    }
    if (!sendMoneyAboroadForms.receivingCurrency) {
      newErrors.receivingCurrency = "Currency is required";
    }

    if (!sendMoneyAboroadForms.purposeOfTransfer) {
      newErrors.purposeOfTransfer = "Purpose is required";
    }

    if (!sendMoneyAboroadForms.transferToCountry) {
      newErrors.transferToCountry = "Receiver Country is required";
    }

    if (!sendMoneyAboroadForms.receivingAmountInEuro) {
      newErrors.receivingAmountInEuro = "Amount in Euro is required";
    }

    if (!sendMoneyAboroadForms.receivingAmountInINR) {
      newErrors.receivingAmountInINR = "Amount in INR is required";
    }

    setErrors(newErrors);

    if(!isLoggedIn){
      getShowModalData(true)
      localStorage.setItem('sendmoneyloggedIn',true)
    }

    if (Object.keys(newErrors).length === 0 && isLoggedIn) {
      setFormStep(1);
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
      if (sendMoneyAboroadForms.receivingCurrency !== "") {
        const response = await axios.get(
          "https://v6.exchangerate-api.com/v6/1902e21487d17680cb9fc088/latest/" +
            sendMoneyAboroadForms.receivingCurrency
        );
        const { INR } = response.data.conversion_rates;
        const finalINR = (INR + (INR / 100) * 1.75).toFixed(2);

        dispatch(setformValue({ oneEurotoINR: finalINR }));
        // const inrValue = sendMoneyAboroadForms.oneEurotoINR;
        // handleInputChange("receivingAmountInINR", inrValue);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCurrentRateINRtoEURO();
  }, [sendMoneyAboroadForms.receivingCurrency]);

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
              value="4017"
            />
            {errors.transferFromState && (
              <span className="text-[red] text-[11px] italic">
                {errors.transferFromState}
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
              {errors.transferFromCity && (
                <span className="text-[red] text-[11px] italic">
                  {errors.transferFromCity}
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
            <div className="relative z-0 w-full mb-5 group mt-3">
              {/* <input
                type="text"
                name="studyCountry"
                id="studyCountry"
                list="studyCountryList"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => {
                  handleInputChange("transferToCountry", e.target.value);
                  handleInputChange("beneficiaryCountry", e.target.value);

                  clearError("transferToCountry");
                }}
              value={sendMoneyAboroadForms.transferToCountry}
              /> */}

              <label
                htmlFor="studyCountry"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Transfer To
              </label>

              <select
                className="w-[100%] border mt-3 p-2"
                onChange={(e) => {
                  handleInputChange("transferToCountry", e.target.value);
                  handleInputChange("beneficiaryCountry", e.target.value);

                  clearError("transferToCountry");
                }}
                value={sendMoneyAboroadForms.transferToCountry}
              >
                <option value="">Please select a country</option>
                {countriesList.map((val, index) => {
                  return (
                    // <div key={val.value + index}>
                    <option value={val.name}>{val.name}</option>
                    // </div>
                  );
                })}
              </select>

              {errors.transferToCountry && (
                <span className="text-[red] text-[11px] italic">
                  {errors.transferToCountry}
                </span>
              )}
            </div>
          </div>
          <div className="mt-5">
            <div className="w-full mb-5 group">
              <div className="text-[16px]">Purpose</div>
              <select
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => {
                  handleInputChange("purposeOfTransfer", e.target.value);
                  clearError("purposeOfTransfer");
                }}
                value={sendMoneyAboroadForms.purposeOfTransfer}
              >
                <option value="">--Select A Purpose--</option>
                <option>Maintenance of Close relative Abroad</option>
                <option>Gift</option>
                <option>Education Abroad</option>
                <option>Travel for Education</option>
                <option>Travel for medical treatment abroad</option>
                <option>Private visit to any foreign Country</option>
                <option>Emigration abroad, employment abroad</option>
                <option>Employment abroad</option>
                <option>Blocked Account payment</option>
                <option>GIC Payment to Canada</option>
              </select>
              {errors.purposeOfTransfer && (
                <span className="text-[red] text-[11px] italic">
                  {errors.purposeOfTransfer}
                </span>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <select
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => {
                  handleInputChange("receivingCurrency", e.target.value);
                  const selectedOption = currencyWithSymbol.find(
                    (option) => option.value === e.target.value
                  );
                  handleInputChange("receivingAmountInINR", "");
                  handleInputChange("receivingAmountInEuro", "");

                  setselectedCurrencySymbol(selectedOption.symbol);
                  clearError("receivingCurrency");
                }}
                value={sendMoneyAboroadForms.receivingCurrency}
              >
                <option value="">--Select A Currency--</option>
                {currencyWithSymbol.map((val, index) => {
                  return (
                    <>
                      {" "}
                      <option value={val.value}>{val.name}</option>
                    </>
                  );
                })}
              </select>
              {errors.receivingCurrency && (
                <span className="text-[red] text-[11px] italic">
                  {errors.receivingCurrency}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                readOnly={true}
                value={sendMoneyAboroadForms.sendingCurrencyIn}
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
                  value={sendMoneyAboroadForms.receivingAmountInEuro}
                  onChange={(e) => {
                    const inrValue =
                      e.target.value * sendMoneyAboroadForms.oneEurotoINR;
                    handleInputChange("receivingAmountInINR", inrValue);
                    handleInputChange("receivingAmountInEuro", e.target.value);
                    clearError("receivingAmountInINR");
                    clearError("receivingAmountInEuro");
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <span className="text-gray-500">
                    {selectedCurrencySymbol}
                  </span>
                </div>
                {errors.receivingAmountInEuro && (
                  <span className="text-[red] text-[11px] italic">
                    {errors.receivingAmountInEuro}
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
                  value={sendMoneyAboroadForms.receivingAmountInINR}
                  onChange={(e) => {
                    const inputValue = parseFloat(e.target.value);
                    const eurValue =
                      inputValue / sendMoneyAboroadForms.oneEurotoINR;
                    handleInputChange("receivingAmountInEuro", eurValue);
                    handleInputChange("receivingAmountInINR", inputValue);
                    clearError("receivingAmountInINR");
                    clearError("receivingAmountInEuro");
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <span className="text-gray-500">&#x20B9;</span>
                </div>
                {errors.receivingAmountInINR && (
                  <span className="text-[red] text-[11px] italic">
                    {errors.receivingAmountInINR}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>Total : {sendMoneyAboroadForms.receivingAmountInINR} &#x20B9;</div>
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
