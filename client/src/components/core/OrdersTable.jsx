import React,{useState} from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
const OrdersTable = ({userOrders,loading}) => {
       const[bookOrders,setBookOrders]=useState([]);
       const[orderSummaryDetails,setOrderSummaryDetails]=useState(()=>{
    const storedData=localStorage.getItem("convertEntries")
    const parsedData=storedData?JSON.parse(storedData):null 
    return parsedData
  })

       if(orderSummaryDetails?.length==0){
        return <h1 className='pl-14 text-3xl'>No Orders Found</h1>
       }

       console.log('userOrders',userOrders);

       if(!loading && userOrders?.length==0){
        return <div className='text-3xl text-center'>No orders found</div>
       }
  return (
     <div>

        <Table className='border w-full mt-7 mx-auto flex flex-col border-[#DDDDDD]' >

            <Thead className="bg-white">
                <Tr className='flex items-center rounded-t-md border-b border-[#DDDDDD]  justify-between p-5'>
                    <Th className=' text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        Order Note
                    </Th>
                    <Th className='text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        Order Id
                    </Th>
                    <Th className='text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        Order Status
                    </Th>
                    <Th className='text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        Order Date
                    </Th>
                    <Th className='text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        Order Amount
                    </Th>
                </Tr>
            </Thead>

            <Tbody className='flex flex-col justify-center'>
               {
                        userOrders?.map((entry,index)=>{
                            console.log('entry',entry);
                           return <Tr key={index} className='flex items-center  bg-white border-b border-[#DDDDDD]  justify-between p-5'>
                                 <Td className='text-lg font-medium text-richblack-600  border-none text-center'>
                                    {entry.orderNote || "Remiwire order1"}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none text-center relative md:right-12'>
                                    {entry?.orderId}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none text-center relative md:right-20'>
                                    {entry?.orderStatus || "Paid"}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none relative md:right-20'>
                                    {entry?.orderDate || entry?.createdAt || "2024-06-10"}
                                </Td>
                                <Td className='text-lg font-medium text-richblack-600  border-none relative md:right-10'>
                                    {entry?.orderAmount}{entry?.currency || "1INR"}
                                </Td>
                            </Tr>
                        })
                    }
            </Tbody>


        </Table>
        
      </div>
)
}
export default OrdersTable