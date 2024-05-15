import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom"
import '../../App.css'
import IconBtn from '../common/IconBtn'
import { FiPlus } from 'react-icons/fi'
import ShowUserAddress from './ShowUserAddress'
import { createAddress, fetchDeliveryAddress } from '../../services/operations/SettingsApi'
import { setUser } from '../../utils/profileSlice'
const ManageAddress = ({checkoutPageAddress,setAddAddress,setViewAddress,editAddress,setEditAddress}) => {
  const{user}=useSelector((state)=>state.profile)
  const{token}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const[showAddressField,setShowAddressField]=useState(false);
  const[loading,setLoading]=useState(false);
  const[deliveryAddress,setDeliveryAddress]=useState([]);

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


 const submitAddress=async(data)=>{
    try{
      await createAddress(token,data)
      getDeliveryAddress()
      setAddAddress(false)
      setViewAddress(true)
    }catch(err){
      console.log("error message",err.message);
    }
  }


  const getDeliveryAddress = async () => {
    setLoading(true)
    const result = await fetchDeliveryAddress(token,dispatch,user,setUser)
    if (result) {
      setDeliveryAddress(result)
    }
    setLoading(false)
  }

  useEffect(()=>{
    setValue('city',user?.additionalDetails?.city)
  },[])

  useEffect(()=>{
    if(user){
    getDeliveryAddress();
    }
  },[])

  const selectedState=watch('state')

  console.log('user',user);

  useEffect(()=>{
    if(checkoutPageAddress){
      setShowAddressField(true)
    }
  },[])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(submitAddress)}>
        <div className='my-5 flex flex-col gap-y-6 rounded-md'>
           {!checkoutPageAddress && <div className='flex flex-row gap-5 items-center border border-richblack-700 p-4 cursor-pointer' onClick={()=>setShowAddressField(true)}>
            <FiPlus className='text-richblack-700 text-3xl'/>
            <p className='uppercase text-2xl text-richblack-700'>Add a new address</p>
          </div>
}
          {showAddressField && 
          <div className='flex flex-col gap-y-6'>

          <div className='flex flex-col gap-5 md:flex-row'>
            <div className='flex flex-col gap-2 md:w-[48%]'>
              <label htmlFor='phone' className="text-richblack-700">
                Phone No
                <sup className="text-pink-200">*</sup>
              </label>
              <input type="text"
              name="number"
              placeholder='Enter Phone Number'
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register("phone",{
                required:{
                  value:true,
                  message:"Please enter your phone No"
                }
              })}
              required
              />
              {
                errors.phone && (
                  <span >
                    {errors?.phone}
                  </span>
                )
              }
            </div>

            <div className='flex flex-col gap-2 md:w-[48%]'>
              <label htmlFor='country' className="text-richblack-700">
                Country
                <sup className="text-pink-200">*</sup>
              </label>
              <input type="text"
              name="text"
              placeholder='Enter Country'
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register("country",{
                required:{
                  value:true,
                  message:"Please enter your Country"
                }
              })}
              required
              />
              {
                errors.phone && (
                  <span >
                    {errors?.phone}
                  </span>
                )
              }
            </div>

          </div>

           <div className='flex flex-col gap-5 lg:flex-row'>
            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor='zipcode' className="text-richblack-700">
                Pin Code
                <sup className="text-pink-200">*</sup>
              </label>
              <input 
              type="text"
              name="zipcode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              id="zipcode"
              placeholder='Enter zipcode'
              {...register("zipcode",{required:true})}
              required
              defaultValue={user?.additionalDetails?.zipcode}
              />
              {
                errors.firstName && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please enter your zipcode
                  </span>
                )
              }
            </div>

            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor='locality' className="text-richblack-700">
               Locality
               <sup className="text-pink-200">*</sup>
              </label>
              <input 
              type="text"
              id="locality"
              placeholder='Enter Locality'
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
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
              <label htmlFor='address' className="text-richblack-700">
                Address
                <sup className="text-pink-200">*</sup>
              </label>
              <input type="text"
              name="address"
              placeholder='Enter address'
              id="address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register("address",{
                required:{
                  value:true,
                  message:"Please enter your address"
                }
              })}
              required
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

              <label htmlFor='state' className="text-richblack-700">
                State
                <sup className="text-pink-200">*</sup>
              </label>
              <select
              type='text'
              name='state'
              id='state'
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register('state',{required:true})}
              defaultValue={user?.additionalDetails?.state}
              required
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

              <label htmlFor='city' className="text-richblack-700">
                City
                <sup className="text-pink-200">*</sup>
              </label>
              <select
              type='text'
              name='city'
              id='city'
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register('city',{required:true})}
              defaultValue={user?.additionalDetails?.city}
              required
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
              <label htmlFor='landmark' className="text-richblack-700">
                Landmark
                <sup className="text-pink-200">*</sup>
              </label>
              <input 
              type="text"
              name="landmark"
              id="landmark"
              placeholder='Enter landmark'
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-black::placeholder"
              {...register("landmark",{required:true})}
              defaultValue={user?.additionalDetails?.landmark}
              required
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
              setShowAddressField(false)
            }}
            className='bg-richblack-900 text-white py-2 px-5 rounded-md'
            >
              Cancel
            </button>
            <IconBtn type="submit" text="Save"/>
          </div>
        </div>
}
        </div>
      </form>

      {!checkoutPageAddress && 
      <div>
        
        <ShowUserAddress deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress}/>
      </div>
}
    </>
  )
}

export default ManageAddress