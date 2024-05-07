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
    <div className="bg-richblack-900 pb-52 h-calc w-full">
      <div className={`${!passedFromSignup ? "lg:h-[150px]" : ""}`}></div>
      <div
        className={`${
          !passedFromSignup ? "w-11/12 mx-auto justify-center flex" : "mt-8"
        }`}
      >
        <div className="flex flex-col w-[80%] mt-6 lg:mt-0">
          <div className="w-full md:w-8/12">
            <div className="text-4xl font-semibold text-richblack-300 mt-6 lg:mt-0">
              Login Here
            </div>

            {/* form  */}
            <form onSubmit={(e) => handleOnSubmit(e)}>
              <div className="flex flex-col gap-5 mt-7">
                <div className="flex flex-col relative">
                  <label
                    className="text-richblack-5"
                    onChange={(e) => handleFormData()}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full mt-3 p-3 rounded-lg bg-richblack-800 text-white"
                    name="email"
                    value={email}
                    onChange={(e) => handleOnChange(e)}
                    required
                  />
                </div>

                <div></div>

                <div className="flex flex-row items-center gap-5">
                  <div className="flex flex-col relative  w-full">
                    <label className="text-richblack-5">Create Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      style={{
                        boxShadow:
                          "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="mt-3 p-3 rounded-lg bg-richblack-800 text-white"
                      name="password"
                      value={password}
                      onChange={(e) => handleOnChange(e)}
                      required
                    />
                    {!showPassword && (
                      <AiFillEye
                        className="text-richblack-5 absolute right-7 top-[45px] cursor-pointer"
                        size={30}
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                    {showPassword && (
                      <AiFillEyeInvisible
                        className="text-richblack-5 absolute right-7 top-[45px] cursor-pointer"
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
