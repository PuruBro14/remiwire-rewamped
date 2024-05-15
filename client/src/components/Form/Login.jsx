import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../services/operations/authAPI";

const Login = ({ passedFromSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(setLogin(email, password, navigate));

    setFormData({
      email: "",
      password: "",
    });
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
            <form onSubmit={(e) => handleOnSubmit(e)}>
              <div className="flex flex-col gap-5 mt-7">
                <div className="flex flex-col relative">
                  <label
                    className="text-richblack-700"
                    onChange={(e) => handleFormData()}
                  >
                    Email address
                    <sup className="text-pink-200">*</sup>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                    name="email"
                    value={email}
                    onChange={(e) => handleOnChange(e)}
                    required
                  />
                </div>

                <div></div>

                <div className="flex flex-row items-center gap-5">
                  <div className="flex flex-col relative  w-full">
                    <label className="text-richblack-700">Create Password
                    <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      style={{
                        boxShadow:
                          "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                      name="password"
                      value={password}
                      onChange={(e) => handleOnChange(e)}
                      required
                    />
                    {!showPassword && (
                      <AiFillEye
                        className=" absolute right-7 top-[20px] cursor-pointer"
                        size={30}
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                    {showPassword && (
                      <AiFillEyeInvisible
                        className=" absolute right-7 top-[20px] cursor-pointer"
                        size={30}
                        onClick={() => setShowPassword(false)}
                      />
                    )}
                  </div>
                </div>

                <div className="mt-7">
                  <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full"
                  >
                    Login
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
