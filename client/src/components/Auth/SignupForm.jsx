import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { setSignUpData } from "../../utils/authSlice";
import { useDispatch } from "react-redux";
import { sendSignUp } from "../../services/operations/authAPI";
const SignupForm = ({ sendMoneyLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleFormData = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    const { userName, firstName, lastName, phoneNo, email, password } =
      formData;

    if (!userName || !firstName || !lastName || !email || password) {
      setError("All fields are required");
    }

    if (!email) {
      setError((prevState) => ({ ...prevState, email: "Email is required" }));
      return;
    }
    if (!password) {
      setError((prevState) => ({
        ...prevState,
        password: "Password is required",
      }));
      return;
    }

    dispatch(setSignUpData(formData));

    dispatch(
      sendSignUp(
        userName,
        firstName,
        lastName,
        email,
        phoneNo,
        password,
        navigate
      )
    );

    setFormData({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="">
      <div className="w-full md:w-8/12 my-2 shadow-md md:shadow-xl px-10 py-5 mx-auto">
        <div className="text-4xl font-semibold text-richblack-800 mt-6 lg:mt-0">
          {sendMoneyLoggedIn
            ? "Haven’t registered? Sign up now."
            : "Register Here"}
        </div>

        {/* form  */}
        <form onSubmit={(e) => signInHandler(e)}>
          <div className="flex flex-col gap-5 mt-7">
            <div className="flex flex-row items-center">
              <div className="flex flex-col w-full">
                <label className="text-richblack-700">
                  Username <sup className="text-pink-200">*</sup>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your UserName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                  name="userName"
                  value={formData.userName}
                  onChange={(e) => handleFormData(e)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col relative">
              <label
                className="text-richblack-700"
                onChange={(e) => handleFormData()}
              >
                First Name <sup className="text-pink-200">*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your First Name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleFormData(e)}
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label
                className="text-richblack-700"
                onChange={(e) => handleFormData()}
              >
                Last Name <sup className="text-pink-200">*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your Last Name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleFormData(e)}
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label
                className="text-richblack-700"
                onChange={(e) => handleFormData()}
              >
                Phone Number <sup className="text-pink-200">*</sup>
              </label>
              <input
                type="number"
                placeholder="Enter Your phone number"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={(e) => handleFormData(e)}
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label
                className="text-richblack-700"
                onChange={(e) => handleFormData()}
              >
                Email address <sup className="text-pink-200">*</sup>
              </label>
              <input
                type="email"
                placeholder="Enter Your email address"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                name="email"
                value={formData.email}
                onChange={(e) => handleFormData(e)}
                required
              />
            </div>

            <div></div>

            <div className="flex flex-row items-center gap-5">
              <div className="flex flex-col relative  w-full">
                <label className="text-richblack-700">
                  Create Password <sup className="text-pink-200">*</sup>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleFormData(e)}
                  required
                />
                {!showPassword && (
                  <AiFillEye
                    className="bg-white absolute right-7 top-[20px] cursor-pointer"
                    size={30}
                    onClick={() => setShowPassword(true)}
                  />
                )}
                {showPassword && (
                  <AiFillEyeInvisible
                    className="bg-white absolute right-7 top-[20px] cursor-pointer"
                    size={30}
                    onClick={() => setShowPassword(false)}
                  />
                )}
              </div>
            </div>

            <div className="mt-7">
              <button
                type="submit"
                className="rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full"
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
