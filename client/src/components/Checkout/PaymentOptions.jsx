import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { bookOrder } from '../../services/operations/ConversionApi';
const PaymentOptions = () => {
  const {step}=useSelector((state)=>state.bookCurrency)
  const{user}=useSelector((state)=>state.profile)
  const {token}=useSelector((state)=>state.auth)
   const[showAccordionData,setShowAccordionData]=useState(true);
   const navigate=useNavigate();
   const dispatch=useDispatch();
  const toggleAccordion=()=>{
    setShowAccordionData(!showAccordionData)
  }

  const placeOrder=async(data)=>{
    console.log('clicked');
    try{
      // dispatch(bookOrder(token,data,navigate))
            navigate("/my-orders");
    }catch(err){
      console.log("Error message - ",err.message);
    }
  }

  return (
    <div className='flex flex-col mt-7'>
      {/* first div  */}
      <div className='relative flex flex-row gap-x-4 h-12 items-center p-5 bg-gradient-to-b from-[#FF512F] to-[#F09819]'>
        <span className='text-white'>4</span>
        <span className='text-white uppercase'>Payment Options</span>
        <IoIosArrowDown className='text-white text-[25px] absolute right-10 cursor-pointer' onClick={toggleAccordion}/>
      </div>

      {/* second div  */}
      {step>=4 && showAccordionData && 
      <div className='flex flex-col gap-y-5 p-8 shadow-md bg-white text-richblack-800'>
        <div className='flex flex-row gap-x-3'>
        <input type="radio"/>
        <p>Cash on Delivery</p>
        </div>
        <button className='bg-gradient-to-b from-[#FF512F] to-[#F09819] px-[18px] py-[12px] rounded-full mt-3 text-white' onClick={placeOrder}>
          Place Order
        </button>
      </div>
      
      
}
    </div>
  )
}

export default PaymentOptions