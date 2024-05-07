import React, { useEffect, useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
const ConvertTable = ({ConvertTableEntries,editArray,filterArray,setTotalAmount,currentState}) => {
    console.log('UpdatedData','Rendered again',ConvertTableEntries);
     const [convertTableDetails, setConvertTableDetails] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('convertEntries');
    console.log(storedData);
    const parsedData = storedData ? JSON.parse(storedData) : [];
    setConvertTableDetails(parsedData);
  }, [ConvertTableEntries]);

  console.log('convertTableDetails',convertTableDetails);

  if(convertTableDetails?.length===0){
    return null
  }
  return (
     <div>

        <Table className='border border-[#DDDDDD] w-11/12 mt-7 mx-auto flex flex-col shadow-md' >

            <Thead>
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
                    <Th className='text-left text-lg font-medium uppercase text-richblack-600 border-none'>
                        Actions
                    </Th>
                </Tr>
            </Thead>

            <Tbody className='flex flex-col justify-center'>
                {
                    convertTableDetails?.length===0?(
                        <Tr>
                            <Td className='text-lg font-medium text-richblack-600  border-none text-center'>
                                No currencies found
                            </Td>
                        </Tr>
                    )
                    :(
                        convertTableDetails?.map((entry,index)=>(
                            <Tr key={index} className='flex items-center rounded-t-md border-b border-[#DDDDDD]  justify-between p-5'>
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
                                 <Td className='text-lg font-medium text-richblack-600  border-none flex flex-row gap-5'>
                                    <button onClick={(e)=>editArray(e,entry,index)}>
                                        <FiEdit2 size={20} />
                                    </button>
                                    <button onClick={(e)=>filterArray(e,entry,index)}>
                                        <RiDeleteBin6Line size={20}/>
                                    </button>
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

export default ConvertTable