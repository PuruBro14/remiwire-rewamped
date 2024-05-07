import React, { useState } from "react";
import "./assets/css/ourservices.css";
import image1 from "./assets/img/blocked.jpg";
import { axiosInstance } from "../../services/operations/apiconnector";

export default function CreateGICAccount() {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    moblieNumber: "",
    emailId: "",
    blockedAccPref: "",
    offerLetter: "",
    passportCopy: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataF = new FormData();
    console.log(">>>>>>>>>>", formData);
    formDataF.append("fName", formData.fName);
    formDataF.append("lName", formData.lName);
    formDataF.append("moblieNumber", formData.moblieNumber);
    formDataF.append("emailId", formData.emailId);
    formDataF.append("blockedAccPref", formData.blockedAccPref);
    formDataF.append("offerLetter", formData.offerLetter);
    formDataF.append("passportCopy", formData.passportCopy);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axiosInstance.post("/locla", formData, config);
    // make axios request
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "offerLetter" || name === "passportCopy") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center my-4 text-3xl mt-10 mb-10">
        CREATE GIC ACCOUNT
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
          <div className="p-4">
            <div className="sma_pclara bg-white shadow-lg rounded-lg p-6">
              <div>
                <p className="text-[20px]">
                  For getting assistance in Opening GIC Account:
                </p>
                <p className="text-[12px]">
                  Kindly share below mentioned details, our team will contact
                  you shortly:
                </p>
              </div>

              <div className="mt-10">
                <div className="mb-10  text-bold text-[18px]">
                  Student Details:
                </div>
                <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="fName"
                        id="fname"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />

                      <label
                        htmlFor="fname"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        First Name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="lName"
                        id="course_details"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={(e) => handleChange(e)}
                        required
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
                        type="tel"
                        pattern="[0-9]{10}"
                        name="moblieNumber"
                        id="course_details"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />

                      <label
                        htmlFor="tel"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Mobile no
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="emailId"
                        name="emailId"
                        id="emailId"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={(e) => handleChange(e)}
                        required
                      />
                      <label
                        htmlFor="emailId"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email id
                      </label>
                    </div>
                  </div>

                  <div className="relative z-0 w-full mb-5 mt-5 group">
                    <select
                      name="blockedAccPref"
                      id="blockedAccPref"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative" // Added relative class here
                      placeholder=" "
                      required
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">--Please Select--</option>
                      <option>CIBC</option>
                      <option>Scotia</option>
                      <option>ICICI Canada</option>
                    </select>
                    {/* Add dropdown icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700 dark:text-white">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 12l-6-6h12l-6 6z" />
                      </svg>
                    </div>

                    <label
                      htmlFor="course_details"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Blocked Account Preference
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <div>
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                      >
                        Upload Offer letter
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer "
                        name="offerLetter"
                        id="file_input"
                        type="file"
                        required
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <div>
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                      >
                        Upload Passport Copy
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer "
                        name="passportCopy"
                        id="file_input"
                        type="file"
                        required
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-[30px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <img src={image1} alt="Prepaid Travel Card" className="w-full" />
        </div>
      </div>
    </div>
  );
}