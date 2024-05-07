import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom"
import '../../App.css'
import IconBtn from '../common/IconBtn'
const AddAddress = () => {
  const{user}=useSelector((state)=>state.profile)
  const{token}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const{
    register,
    handleSubmit,
    formState:{errors},
    setValue,
    watch
  }=useForm();

  const stateCityData = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Tirupati'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Tawang'],
  'Assam': ['Guwahati', 'Dibrugarh', 'Silchar'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
  'Haryana': ['Faridabad', 'Gurugram', 'Hisar'],
  'Himachal Pradesh': ['Shimla', 'Kullu', 'Dharamshala'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubballi'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
  'Manipur': ['Imphal', 'Thoubal', 'Churachandpur'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Saiha'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela'],
  'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Rishikesh'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur'],
  'Andaman and Nicobar Islands': ['Port Blair', 'Garacharma', 'Bambooflat'],
  'Chandigarh': ['Chandigarh'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Diu', 'Silvassa'],
  'Lakshadweep': ['Kavaratti', 'Agatti', 'Andrott'],
  'Delhi': ['New Delhi', 'Noida', 'Gurgaon'],
  'Puducherry': ['Puducherry', 'Karaikal', 'Mahe']
};


  const submitProfileForm=async(data)=>{
    try{
      
    }catch(err){
      console.log("Error message - ",err.message);
    }
  }

  useEffect(()=>{
    setValue('city',user?.additionalDetails?.city)
  },[])

  const selectedState=watch('state')

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className='my-5 flex flex-col gap-y-6 rounded-md border-richblack- px-12'>
          <h2 className='text-lg font-semibold text-richblack-5'>
            Add Address
          </h2>
          <div className='flex flex-col gap-5 lg:flex-row'>
            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor='pincode' className='label-style'>
                Pincode
              </label>
              <input 
              type="text"
              name="pincode"
              className='form-style'
              id="pincode"
              placeholder='Enter Pincode'
              {...register("pincode",{required:true})}
              defaultValue={user?.additionalDetails?.pincode}
              />
              {
                errors.firstName && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please enter your pincode
                  </span>
                )
              }
            </div>

            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor='locality' className='label-style'>
               Locality
              </label>
              <input 
              type="text"
              name="locality"
              id="locality"
              placeholder='Enter Locality'
              className='form-style'
              {...register("locality",{required:true})}
              defaultValue={user?.additionalDetails?.locality}
              />
              {
                errors.locality && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please enter your locality
                  </span>
                )
              }
            </div>

          </div>

          <div className='flex flex-col gap-5 md:flex-row'>
            <div className='flex flex-col gap-2 md:w-[48%]'>
              <label htmlFor='address' className='label-style'>
                Address
              </label>
              <input type="text"
              name="address"
              placeholder='Enter address'
              id="address"
              className='form-style'
              {...register("address",{
                required:{
                  value:true,
                  message:"Please enter your address"
                }
              })}
              />
              {
                errors.address && (
                  <span >
                    {errors?.address}
                  </span>
                )
              }
            </div>

            <div className='flex flex-col gap-2 md:w-[48%]'>

              <label htmlFor='state' className='label-style'>
                State
              </label>
              <select
              type='text'
              name='state'
              id='state'
              className='form-style'
              {...register('state',{required:true})}
              defaultValue={user?.additionalDetails?.state}
              >
                <option value=''>Select a state</option>
                {
                  Object.keys(stateCityData)?.map((ele,i)=>{
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
            <div className='flex flex-col gap-2 md:w-[48%]'>

              <label htmlFor='city' className='label-style'>
                City
              </label>
              <select
              type='text'
              name='city'
              id='city'
              className='form-style'
              {...register('city',{required:true})}
              defaultValue={user?.additionalDetails?.city}
              >
                <option value=''>Select a City</option>
                {
                 selectedState && stateCityData[selectedState]?.map((ele,i)=>{
                    return(
                      <option key={i} value={ele}>
                        {ele}
                      </option>
                    )
                  })
                }
              </select>
            </div>

            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor='landmark' className='label-style'>
                Landmark
              </label>
              <input 
              type="text"
              name="landmark"
              id="landmark"
              placeholder='Enter landmark'
              className='form-style'
              {...register("landmark",{required:true})}
              defaultValue={user?.additionalDetails?.landmark}
              />
              {
                errors.landmark && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>
                   {errors?.landmark?.message}
                  </span>
                )
              }
            </div>

          </div>

          <div className='flex justify-end gap-x-5'>
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
        </div>
      </form>
    </>
  )
}

export default AddAddress