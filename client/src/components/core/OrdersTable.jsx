import React,{useState} from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
const OrdersTable = ({ConvertTableEntries,editArray,filterArray}) => {
       const[bookOrders,setBookOrders]=useState([]);
       const[orderSummaryDetails,setOrderSummaryDetails]=useState(()=>{
    const storedData=localStorage.getItem("convertEntries")
    const parsedData=storedData?JSON.parse(storedData):null 
    return parsedData
  })

       if(orderSummaryDetails?.length==0){
        return <h1 className='pl-14 text-3xl'>No Orders Found</h1>
       }
  return (
     <div>

        <Table className='border w-11/12 mt-7 mx-auto flex flex-col border-[#DDDDDD]' >

            <Thead className="bg-white">
                <Tr className='flex items-center rounded-t-md border-b border-[#DDDDDD]  justify-between p-5'>
                    <Th className='text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        Conversion
                    </Th>
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
                    <Th className='text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        Status
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
                            <Tr key={index} className='flex items-center  bg-white border-b border-[#DDDDDD]  justify-between p-5'>
                                 <Td className='text-lg font-medium text-richblack-600  border-none text-center'>
                                    Buy
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none text-center relative md:left-20'>
                                    {entry?.amount}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none text-center relative md:left-20'>
                                    {entry?.from}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none relative'>
                                    {entry?.to}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none relative md:right-10'>
                                    {entry?.currentRate.toFixed(3)}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none'>
                                    {entry?.amount}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none flex flex-row gap-5'>
                                   Pending
                                </Td>
                            </Tr>
                        ))
                    )
}
            </Tbody>

        </Table>
        
      </div>
  )
}

export default OrdersTable