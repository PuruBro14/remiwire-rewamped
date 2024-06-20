import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin,sendOtp,verifyOtp } from "../../services/operations/authAPI";

const Login = ({ passedFromSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    otp: "",
  });

  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
    const { email, password, phoneNumber, otp } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (isPhoneLogin) {
      if (isOtpSent) {
        dispatch(verifyOtp(phoneNumber, otp, navigate));
      } else {
        dispatch(sendOtp(phoneNumber)).then((response) => {
          if (response.success) {
            setIsOtpSent(true);
          }
        });
      }
    } else {
      dispatch(setLogin(email, password, navigate));
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="md:pb-28 h-calc w-full">
      <div className={`${!passedFromSignup ? "lg:h-[150px]" : ""}`}></div>
      <div
        className={`${
          !passedFromSignup ? "w-11/12 mx-auto justify-center flex" : "mt-8"
        }`}
      >
        <div className="flex flex-col w-[100%] md:w-[50%] mx-auto shadow-md md:shadow-xl px-10 py-16 mt-6 lg:mt-0">
          <div className="w-full">
            <div className="text-4xl font-semibold text-richblack-800 mt-6 lg:mt-0">
              Login Here
            </div>

            {/* form  */}
            <form onSubmit={handleOnSubmit}>
              <div className="flex flex-col gap-5 mt-7">
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    className={`py-2 px-4 ${isPhoneLogin ? "bg-gray-200" : "bg-yellow-50"} font-medium`}
                    onClick={() => setIsPhoneLogin(false)}
                  >
                    Email Login
                  </button>
                  <button
                    type="button"
                    className={`py-2 px-4 ${isPhoneLogin ? "bg-yellow-50" : "bg-gray-200"} font-medium`}
                    onClick={() => setIsPhoneLogin(true)}
                  >
                    Phone Login
                  </button>
                </div>

                {!isPhoneLogin ? (
                  <>
                    <div className="flex flex-col relative">
                      <label className="text-richblack-700">
                        Email address
                        <sup className="text-pink-200">*</sup>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                    <div className="flex flex-row items-center gap-5">
                      <div className="flex flex-col relative w-full">
                        <label className="text-richblack-700">
                          Password
                          <sup className="text-pink-200">*</sup>
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                          name="password"
                          value={password}
                          onChange={handleOnChange}
                          required
                        />
                        {!showPassword && (
                          <AiFillEye
                            className="absolute right-7 top-[20px] cursor-pointer"
                            size={30}
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                        {showPassword && (
                          <AiFillEyeInvisible
                            className="absolute right-7 top-[20px] cursor-pointer"
                            size={30}
                            onClick={() => setShowPassword(false)}
                          />
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col relative">
                      <label className="text-richblack-700">
                        Phone Number
                        <sup className="text-pink-200">*</sup>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter phone number"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                    {isOtpSent && (
                      <div className="flex flex-col relative">
                        <label className="text-richblack-700">
                          OTP
                          <sup className="text-pink-200">*</sup>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                          name="otp"
                          value={otp}
                          onChange={handleOnChange}
                          required
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="mt-7">
                  <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full"
                  >
                    {isPhoneLogin && !isOtpSent ? "Send OTP" : "Login"}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
