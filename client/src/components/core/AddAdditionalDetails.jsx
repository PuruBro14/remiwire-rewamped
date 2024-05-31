import React from 'react'
import {useForm} from "react-hook-form"
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom"
import '../../App.css'
import IconBtn from '../common/IconBtn'
import { updateProfile } from '../../services/operations/SettingsApi'
const AddAdditionalDetails = () => {
  const{user}=useSelector((state)=>state.profile)
  const{token}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const{
    register,
    handleSubmit,
    formState:{errors}
  }=useForm();

  const genders=["Male","Female","Non-Binary","Prefer not to say"]

  const submitProfileForm=async(data)=>{
    console.log('clicked');
    try{
      dispatch(updateProfile(token,data,navigate))
    }catch(err){
      console.log("Error message - ",err.message);
    }
  }

  console.log('errors',errors);

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className='my-5 flex flex-col gap-y-6 rounded-md border-richblack- px-12'>
          <h2 className='text-lg font-semibold text-richblack-800'>
            Edit Information
          </h2>
          <div className='flex flex-col gap-5 lg:flex-row'>
            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor='firstName' className='text-richblack-700'>
                First Name
                <sup className="text-pink-200">*</sup>
              </label>
              <input 
              type="text"
              name="firstName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              id="firstName"
              placeholder='Enter first name'
              {...register("firstName",{required:true})}
              defaultValue={user?.firstName}
              required
              />
              {
                errors.firstName && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please enter your first name
                  </span>
                )
              }
            </div>

            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor='lastName' className='text-richblack-700'>
                Last Name
                <sup className="text-pink-200">*</sup>
              </label>
              <input 
              type="text"
              name="lastName"
              id="lastName"
              placeholder='Enter last name'
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register("lastName",{required:true})}
              defaultValue={user?.lastName}
              required
              />
              {
                errors.lastName && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please enter your last name
                  </span>
                )
              }
            </div>

          </div>

          <div className='flex flex-col gap-5 md:flex-row'>
            <div className='flex flex-col gap-2 md:w-[48%]'>
              <label htmlFor='dateOfBirth' className='text-richblack-700'>
                Date of Birth
                <sup className="text-pink-200">*</sup>
              </label>
              <input type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register("dateOfBirth",{
                required:{
                  value:true,
                  message:"Please enter your date of birth"
                }
              })}
              value={user?.additionalDetails?.dateOfBirth}
              />
              {
                errors.dateOfBirth && (
                  <span >
                    {errors?.dateOfBirth}
                  </span>
                )
              }
            </div>

            <div className='flex flex-col gap-2 md:w-[48%]'>

              <label htmlFor='gender' className='text-richblack-700'>
                Gender
                <sup className="text-pink-200">*</sup>
              </label>
              <select
              type='text'
              name='gender'
              id='gender'
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register('gender',{required:true})}
              defaultValue={user?.additionalDetails?.gender}
              >
                {
                  genders?.map((ele,i)=>{
                    return(
                      <option key={i} value={ele}>
                        {ele}
                      </option>
                    )
                  })
                }
              </select>
            </div>
          </div>

          <div className='flex flex-col gap-5 lg:flex-row'>
            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor='contactNumber' className='text-richblack-700'>
                Contact Number
                <sup className="text-pink-200">*</sup>
              </label>
              <input 
              type="tel"
              name="contactNumber"
              id="contactNumber"
              placeholder='Enter Contact Number'
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register("contactNumber",{required:true})}
              required
              defaultValue={user?.additionalDetails?.contactNumber}
              />
              {
                errors.firstName && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>
                    {errors?.contactNumber?.message}
                  </span>
                )
              }
            </div>

            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor='email' className='text-richblack-700'>
                Email
              </label>
              <input 
              type="text"
              name="email"
              id="email"
              placeholder='Enter email'
              className="bg-pure-greys-300 block py-3 px-3 w-full text-sm text-gray-900 rounded-md border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register("email")}
              required
              defaultValue={user?.email}
              readOnly
              disabled
              />
            </div>

          </div>

          <div className='flex justify-end gap-x-5'>
            <button 
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"

            >
              Cancel
            </button>
            <IconBtn type="submit" text="Save"/>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddAdditionalDetails