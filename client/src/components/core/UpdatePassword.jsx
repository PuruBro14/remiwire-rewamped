import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../common/IconBtn";
import AddAdditionalDetails from "./AddAdditionalDetails";
import DeleteAccount from "../Settings/DeleteAccount";
import { changePassword } from "../../services/operations/SettingsApi";

function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data);
    } catch (err) {
      console.log("error message", err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newPassword = watch("newPassword");

  return (
    <div>
      <AddAdditionalDetails />
      <h2 className='text-lg font-semibold  px-12 text-richblack-800'>
        Update Password
      </h2>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="mx-10 my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-700">Edit Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="oldPassword" className="text-richblack-700">
                Current Password
                <sup className="text-pink-200">*</sup>
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                {...register("oldPassword", { required: true })}
                required
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[42px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} />
                ) : (
                  <AiOutlineEye fontSize={24} />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="newPassword" className="text-richblack-700">
                New Password
                <sup className="text-pink-200">*</sup>
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
                {...register("newPassword", { required: true })}
                required
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[42px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24}/>
                ) : (
                  <AiOutlineEye fontSize={24}/>
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
          <div className="relative flex flex-col  gap-2 w-full lg:w-[48%]">
            <label htmlFor="confirmPassword" className="text-richblack-700">
              Confirm New Password
              <sup className="text-pink-200">*</sup>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm New Password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === newPassword || "Passwords do not match",
              })}
              required
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[42px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24}/>
              ) : (
                <AiOutlineEye fontSize={24}/>
              )}
            </span>
            {errors.confirmPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.confirmPassword.message || "Please confirm your New Password."}
              </span>
            )}
          </div>
        </div>
        <div className='flex justify-end gap-x-5 mr-14 mb-7'>
          <button 
            className='bg-richblack-900 text-white py-2 px-5 rounded-md'
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save"/>
        </div>
      </form>
      <DeleteAccount />
    </div>
  );
}

export default UpdatePassword;
