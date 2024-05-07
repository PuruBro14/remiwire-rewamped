import React, { useState } from 'react'
import IconBtn from '../common/IconBtn'
import { RiEditBoxLine } from 'react-icons/ri'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
const MyProfile = () => {
    const{user}=useSelector((state)=>state.profile)
    const navigate=useNavigate()

    const[addProfile,setAddProfile]=useState(null);
    const[viewProfile,setViewProfile]=useState(null);
    const[editProfile,setEditProfile]=useState(null);

    console.log('user',user);
    
  return (
   <>
   <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
    My Profile
   </h1>

   <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
    <div className='flex items-center gap-x-2 md:gap-x-4 relative right-8 md:right-0'>
        <img src={user?.image}
        alt={`profile-${user?.firstName}`}bg-richblack-800
        className='aspect-square w-[78px] rounded-full object-cover'
        />
        <div className='space-y-1'>
            <p className='text-lg font-semibold text-richblack-5'>
                {user?.username}
            </p>
            <p className='text-sm text-richblack-300'>
                {
                    user?.email
                }
            </p>
        </div>
        <IconBtn
        text="Edit"
        onclick={()=>{
            navigate("/userprofile/profile-settings")
        }}
        >
            <RiEditBoxLine/>
            </IconBtn>
    </div>
   </div>

   <div className='my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
    <div className='flex w-full items-center justify-between'>
        <p className='text-lg font-semibold text-richblack-5'>Personal Details</p>
        <IconBtn
        text="Edit"
        onclick={()=>{
            navigate("/userprofile/profile-settings")
        }}
        >
            <RiEditBoxLine/>
        </IconBtn>
    </div>
    <div className='flex max-w-[500px] justify-between'>
        <div className='flex flex-col gap-y-5'>

            <div>
                <p className='mb-2 text-sm text-richblack-600'>First Name</p>
                <p className='text-sm font-medium text-richblack-5'>
                    {user?.firstName}
                </p>
            </div>

            <div>
                <p className='mb-2 text-sm text-richblack-600'>Email</p>
                <p className='text-sm font-medium text-richblack-5'>
                    {user?.email}
                </p>
            </div>

            <div>
                <p className='mb-2 text-sm text-richblack-600'>Gender</p>
                <p className='text-sm font-medium text-richblack-5'>
                    {user?.additionalDetails?.gender ?? "Add Gender"}
                </p>
            </div>
            
        </div>

        <div className='flex flex-col gap-y-5'>

            <div>
                <p className='mb-2 text-sm text-richblack-600'>Last Name</p>
                <p className='text-sm font-medium text-richblack-5'>
                    {user?.lastName}
                </p>
            </div>

            <div>
                <p className='mb-2 text-sm text-richblack-600'>Phone Number</p>
                <p className='text-sm font-medium text-richblack-5'>
                    {user?.phoneNo ?? "Add Contact Number"}
                </p>
            </div>

            <div>
                <p className='mb-2 text-sm text-richblack-600'>Date of Birth</p>
                <p className='text-sm font-medium text-richblack-5'>
                    {user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}
                </p>
            </div>
            
        </div>

    </div>
   </div>


   </>
  )
}

export default MyProfile