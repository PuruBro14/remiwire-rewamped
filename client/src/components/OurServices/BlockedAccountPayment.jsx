import React, { useEffect, useState } from "react";
import "./assets/css/ourservices.css";
import image1 from "./assets/img/blocked.jpg";
import countriesList from "../../utils/countryList";
import { FaCheckCircle } from "react-icons/fa";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
export default function BlockedAccountPayment() {
  const [countryid, setCountryid] = useState(101);
  const [stateid, setstateid] = useState(0);
  const [formData, setFormData] = useState({
    transferFromCountry: "India",
    transferFromState: "",
    transferFromCity: "",
    purpose: "Blocked Account Payment",
    transferTo: "",
    receivingCurrency: "Canada",
  });
  const [formStep, setformStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
    // make axios request
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const filteredCountries = [{ label: "India", value: "India" }];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center my-4 text-3xl mt-10 mb-10">
        GERMAN BLOCKED ACCOUNT
      </h2>

      <div className="bg-[#e7e7e7] p-5">
        <p>
          Secure your future with ease using our blocked account payment
          solutions at Remiwire. Streamline your visa application process with
          our reliable blocked account payment services tailored to your needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="p-4">
          <div className="sma_pclara bg-white shadow-lg rounded-lg p-6">
            <div>
              <p className="text-[20px]">
                {" "}
                Officially approved by the German federal Foreign Office.
              </p>
              <p className="text-[14px]">
                Fill up the details below to start your application open Blocked
                Account at Germany before travel.
              </p>
            </div>
            {formStep === 0 && (
              <>
                {" "}
                <div className="mt-10">
                  <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                      <StateSelect
                        countryid={countryid}
                        onChange={(e) => {
                          setstateid(e.id);
                        }}
                        placeHolder="Select State"
                      />
                      <div className="mt-5">
                        <CitySelect
                          countryid={countryid}
                          stateid={stateid}
                          onChange={(e) => {
                            console.log(e);
                          }}
                          placeHolder="Select City"
                        />
                      </div>
                      <label
                        htmlFor="studyCountry"
                        className="peer-focus:font-medium absolute line text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        style={{ lineHeight: "0px" }}
                      >
                        Transfer From
                      </label>
                    </div>

                    <div className="w-full border border-gray-300 rounded-[5px] text-gray p-1">
                      <div className="text-sm">Transfer To</div>
                      <div className="flex">
                        <div
                          className={`w-1/2 flex flex-col gap-2 items-center justify-center relative rounded-md transition duration-300 ease-in-out cursor-pointer ${
                            formData.receivingCurrency === "Canada"
                              ? "bg-gray-100 shadow-md"
                              : ""
                          }`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              receivingCurrency: "Canada",
                            });
                          }}
                        >
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaqCW_Bq-BiAfS23G7BNDgGCGwYdAoH3rEzYx3vnOtLECIgCYRUXWfUUFOe8&s=10"
                            alt="Canada"
                            className="w-[80px]  object-cover rounded-md"
                          />
                          <span className="text-gray-600">Canada</span>
                          {/* Show the checkmark icon if this option is selected */}
                          {formData.receivingCurrency === "Canada" && (
                            <FaCheckCircle className="absolute top-2 right-2 w-6 h-6 text-green-500" />
                          )}
                        </div>
                        <div
                          className={`w-1/2 flex flex-col gap-2 items-center justify-center relative rounded-md transition duration-300 ease-in-out cursor-pointer ${
                            formData.receivingCurrency === "Germany"
                              ? "bg-gray-100 shadow-md"
                              : ""
                          }`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              receivingCurrency: "Germany",
                            });
                          }}
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
                            alt="Germany"
                            className="w-[80px]  object-cover rounded-md"
                          />
                          <span className="text-gray-600">Germany</span>
                          {/* Show the checkmark icon if this option is selected */}
                          {formData.receivingCurrency === "Germany" && (
                            <FaCheckCircle className="absolute top-2 right-2 w-6 h-6 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="w-full mb-5 group">
                        <div className="text-sm">Purpose</div>
                        <input
                          readOnly={true}
                          value="Blocked Account Payment"
                          className="w-full border border-gray-300 rounded-[5px] text-gray p-1"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          readOnly={true}
                          name="courseDetails"
                          id="course_details"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={
                            formData.receivingCurrency === "Canada"
                              ? "Canadian Dollar"
                              : "Euro"
                          }
                        />

                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Receving Currency
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="courseDetails"
                          id="course_details"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={formData.courseDetails}
                          onChange={(e) => handleChange(e)}
                        />
                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Receiving Currency in INR
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          readOnly={true}
                          name="courseDetails"
                          id="course_details"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />

                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Receving Amount
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="courseDetails"
                          id="course_details"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          onChange={(e) => handleChange(e)}
                        />
                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          0
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-[30px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => {
                        setformStep(1);
                      }}
                    >
                      Book Order
                    </button>
                  </form>
                </div>
              </>
            )}
            {formStep === 1 && (
              <>
                {" "}
                <div className="mt-10">
                  <div className="mb-10  text-bold text-[18px]">
                    Remitter Details:
                  </div>
                  <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="file_input"
                        >
                          Upload Pan Card
                        </label>
                        <input
                          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer "
                          id="file_input"
                          type="file"
                        />
                      </div>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="file_input"
                        >
                          Upload Passport
                        </label>
                        <input
                          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer "
                          id="file_input"
                          type="file"
                        />
                      </div>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="file_input"
                        >
                          Block A/C Instruction Sheet
                        </label>
                        <input
                          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer "
                          id="file_input"
                          type="file"
                        />
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
                        />

                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          First Name
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="courseDetails"
                          id="course_details"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Last Name
                        </label>
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
                        />

                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Account Number
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="courseDetails"
                          id="course_details"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          IFSC Code
                        </label>
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
                        />

                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email ID
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="courseDetails"
                          id="course_details"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Mobile No
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-[30px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => {
                        setformStep(2);
                      }}
                    >
                      Proceed
                    </button>
                  </form>
                </div>
              </>
            )}

            {formStep === 2 && (
              <>
                {" "}
                <div className="mt-10">
                  <div className="mb-10  text-bold text-[18px]">
                    Beneficiary Details:
                  </div>
                  <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
                    <div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="courseDetails"
                          id="course_details"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />

                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Beneficiary Name
                        </label>
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
                        />

                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Beneficiary Address
                        </label>
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
                        />

                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Beneficiary Account no
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="courseDetails"
                          id="course_details"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Reconfirm Beneficiary Account no
                        </label>
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
                        />

                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Swift Code
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="courseDetails"
                          id="course_details"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="course_details"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          IBAN No
                        </label>
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
                          value={formData.receivingCurrency}
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
            )}
          </div>
        </div>
        <div className="p-4">
          <img src={image1} alt="Prepaid Travel Card" className="w-full" />
        </div>
      </div>
    </div>
  );
}