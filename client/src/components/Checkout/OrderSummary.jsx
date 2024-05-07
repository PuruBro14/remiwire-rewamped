import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import {useDispatch,useSelector} from "react-redux"
import { setStep } from '../../utils/bookCurrencySlice';
import AboutUsImage from "../HomePage/assets/images/AboutUs.jpg"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
const OrderSummary = () => {
  const[showAccordionData,setShowAccordionData]=useState(true);
  const {step}=useSelector((state)=>state.bookCurrency)
  const{user}=useSelector((state)=>state.profile)
  const dispatch=useDispatch();
  const[orderSummaryDetails,setOrderSummaryDetails]=useState(()=>{
    const storedData=localStorage.getItem("convertEntries")
    const parsedData=storedData?JSON.parse(storedData):null 
    return parsedData
  })

  const toggleAccordion=()=>{
    setShowAccordionData(!showAccordionData)
  }

  const handleCheckout=()=>{
    dispatch(setStep(4))
  }

  console.log('orderSummaryDetails',orderSummaryDetails);
  return (
    <div className='flex flex-col mt-7'>

    <div className='flex flex-col'>

      {/* first div  */}
      <div className='relative flex flex-row gap-x-4 h-12 items-center p-5 bg-gradient-to-b from-[#FF512F] to-[#F09819]'>
        <div className='text-white'>
          3
        </div>
        <div className='text-white uppercase'>
          Order Summary
        </div>
        <IoIosArrowDown className='text-white text-[25px] absolute right-10 cursor-pointer' onClick={toggleAccordion}/>
      </div>

      {/* second div  */}
      {step>=3 && showAccordionData && 
       <Table className='border mt-7 mx-auto flex flex-col' >

            <Thead className="bg-white">
                <Tr className='flex items-center rounded-t-md border-b border-[#DDDDDD]  justify-between p-5'>
                    <Th className='text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        Amount
                    </Th>
                    <Th className='text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        From
                    </Th>
                    <Th className='text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        To
                    </Th>
                     <Th className=' text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        CurrentRate
                    </Th>
                    <Th className=' text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        Total
                    </Th>
                </Tr>
            </Thead>

            <Tbody className='flex flex-col justify-center'>
                {
                    orderSummaryDetails?.length===0?(
                        <Tr classNamebg="bg-white">
                            <Td className='text-lg font-medium text-richblack-600  border-none text-center'>
                                No currencies found
                            </Td>
                        </Tr>
                    )
                    :(
                        orderSummaryDetails?.map((entry,index)=>(
                            <Tr key={index} className='flex items-center  bg-white border-[#DDDDDD]  justify-between p-5'>
                                <Td className='text-lg font-medium text-richblack-600  border-none text-center'>
                                    {entry?.amount}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none text-center'>
                                    {entry?.from}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none relative md:right-10'>
                                    {entry?.to}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none relative md:right-20'>
                                    {entry?.currentRate.toFixed(3)}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none relative md:right-8'>
                                    {entry?.amount}
                                </Td>
                            </Tr>
                        ))
                    )
                }
          <div className='w-full bg-white mt-7 p-5'>
          <p>Delivery by Thu May 5 | Free</p>
           <p>
             <span>Note:</span>
             Free cancellation up to 12 hours. A cancellation fee of 100 (per qty) may be applicable after that
           </p>
         </div>
            </Tbody>

        </Table>
}

    </div>
    {step>=3 && showAccordionData && 
    <div className='flex flex-row justify-between mt-7 shadow-md p-5 bg-white text-richblack-800'>
      Order confirmation email will be sent to {user?.email}
      <button onClick={handleCheckout} className='bg-gradient-to-b from-[#FF512F] to-[#F09819] px-[18px] py-[12px]'>Continue</button>
    </div>
}

    </div>
  )
}

export default OrderSummary

// import React from 'react'

// const OrderSummary = () => {
//   return (
//     <div>OrderSummary</div>
//   )
// }

// export default OrderSummary