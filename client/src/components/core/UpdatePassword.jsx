import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../common/IconBtn"
import AddAdditionalDetails from "./AddAdditionalDetails"
import DeleteAccount from "../Settings/DeleteAccount"
import { changePassword } from "../../services/operations/SettingsApi"

function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm=async(data)=>{
    try{
      await changePassword(token,data)
    }catch(err){
      console.log("error message",err.message);
    }
  }

  return (
    <div>
        <AddAdditionalDetails/> 
        <h2 className='text-lg font-semibold text-richblack-5 px-12'>
            Update Password
          </h2>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="mx-10 my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="oldPassword" className="label-style">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style"
                {...register("oldPassword", { required: true })}
                required
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[42px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="label-style">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style"
                {...register("newPassword", { required: true })}
                required
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[42px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className='flex justify-end gap-x-5 mr-14 mb-7'>
            <button 
            onClick={()=>{
              navigate("/dashboard/settings")
            }}
            className='bg-richblack-900 text-white py-2 px-5 rounded-md'
            >
              Cancel
            </button>
            <IconBtn type="submit" text="Save"/>
          </div>

      </form>

      <DeleteAccount/>
      
    </div>
  )
}

export default UpdatePassword