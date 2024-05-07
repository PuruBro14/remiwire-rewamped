import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import {useDispatch,useSelector} from "react-redux"
import { setStep } from '../../utils/bookCurrencySlice'
import { fetchDeliveryAddress } from '../../services/operations/SettingsApi'
import ManageAddress from './ManageProfileAddress'
const ManageDeliveryAddress = () => {
  const {step}=useSelector((state)=>state.bookCurrency)
  const{user}=useSelector((state)=>state.profile)
  const dispatch=useDispatch();
  const[showAccordionData,setShowAccordionData]=useState(true);
  const[viewAddress,setViewAddress]=useState(false);
  const[addAddress,setAddAddress]=useState(false);
  const[checkoutPageAddress,setCheckoutPageAddress]=useState(false)
  const toggleAccordion=()=>{
    setShowAccordionData(!showAccordionData)
  }

  const handleCheckout=()=>{
    dispatch(setStep(3))
  }

  useEffect(()=>{
    if(user?.address?.map?.length>0){
      setViewAddress(true)
    }
  },[])

  const addNewAddress=()=>{
    setViewAddress(false)
    setAddAddress(true)
    setCheckoutPageAddress(true)
  }

  console.log('viewAddress',viewAddress);

  return (
    <div className='flex flex-col space-y-2 mt-7'>
    <div className='flex flex-col '>

      <div className='relative flex flex-row gap-x-4 h-12 items-center p-5 bg-gradient-to-b from-[#FF512F] to-[#F09819]'>
        <span className='text-white'>2</span>
        <span className='text-white uppercase'>Delivery Address</span>
        <IoIosArrowDown className='text-white text-[25px] absolute right-10 cursor-pointer' onClick={toggleAccordion}/>
      </div>

      {
        step>=2 && showAccordionData && addAddress && 
        <ManageAddress checkoutPageAddress={checkoutPageAddress} setAddAddress={setAddAddress} setViewAddress={setViewAddress}/>
      }

      {
      step>=2 && showAccordionData && viewAddress && 

      user?.address?.slice(-3)?.map((currentItem)=>{
        return (

      <div className='flex flex-col gap-y-5 p-8 shadow-md bg-white text-richblack-800'>

        <div className='flex flex-row justify-between'>

        <div className='flex flex-row gap-x-1 items-center'>
          <input type="radio"/>
          <span className='ml-1'>Home,</span>
          <span>{currentItem?.phone}</span>
          </div>

        </div>

        <div>
          {`${currentItem?.address} , ${currentItem?.city} , ${currentItem?.state} ${currentItem?.country} `}
        </div>

        <div>
           <button className='bg-gradient-to-b from-[#FF512F] to-[#F09819] px-[18px] py-[12px] rounded-full mt-3 text-white' onClick={handleCheckout}>
          Deliver Here
        </button>
        </div>

      </div>
        )
      })

}


    </div>

    {step>=2  && showAccordionData && 
    <div className='flex flex-row p-5 bg-white text-richblack-800 cursor-pointer' onClick={addNewAddress}>
      <span>+</span>
      <span>Add a new address</span>
    </div>
}
    </div>
  )
}

export default ManageDeliveryAddress