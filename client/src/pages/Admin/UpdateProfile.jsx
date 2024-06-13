import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../services/operations/SettingsApi';
import IconBtn from '../../../src/components/common/IconBtn';

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitProfileForm = async (data) => {
    console.log('clicked');
    try {
        alert("Profile not updated")
    } catch (err) {
      console.log("Error message - ", err.message);
    }
  };

  console.log('errors', errors);

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className='my-5 flex flex-col gap-y-6 rounded-md border-richblack- px-12'>
          <h2 className='text-lg font-semibold text-richblack-800'>
            Edit Information
          </h2>
          <div className='flex flex-col gap-2'>
            <label htmlFor='firstName' className='text-richblack-700'>
              First Name
              <sup className="text-pink-200">*</sup>
            </label>
            <input 
              type="text"
              name="firstName"
              id="firstName"
              placeholder='Enter first name'
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
              required
            />
            {errors.firstName && (
              <span className='-mt-1 text-[12px] text-yellow-100'>
                Please enter the first name
              </span>
            )}
          </div>

          <div className='flex flex-col gap-2'>
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
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
              required
            />
            {errors.lastName && (
              <span className='-mt-1 text-[12px] text-yellow-100'>
                Please enter the last name
              </span>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-richblack-700'>
              Email
            </label>
            <input 
              type="text"
              name="email"
              id="email"
              placeholder='Enter email'
              className=" block py-3 px-3 w-full text-sm text-gray-900 rounded-md border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register("email")}
              required
              defaultValue={user?.email}
              readOnly
            />
          </div>

          <div className='flex justify-end gap-x-5'>
            <button 
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              onClick={() => navigate("/admin/manage-profile")}
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

export default UpdateProfile;
