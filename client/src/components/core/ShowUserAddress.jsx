import React, { useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import {useSelector} from "react-redux";
import { deleteExistingAddress, fetchDeliveryAddress } from '../../services/operations/SettingsApi';

const ShowUserAddress = ({deliveryAddress,setDeliveryAddress}) => {
    const{user}=useSelector((state)=>state.profile)
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const[loading,setLoading]=useState(false);
    const{token}=useSelector((state)=>state.auth)

    console.log('deliveryAddress',deliveryAddress);

    const deleteAddress = async (addressId) => {
    setLoading(true)
    await deleteExistingAddress({ addressId: addressId }, token)
    const result = await fetchDeliveryAddress(token)
    if (result) {
      setDeliveryAddress(result)
    }
    setLoading(false)
  }

  return (
    <div>
    {
        deliveryAddress?.slice(-3)?.map((currentItem,index)=>{
            const isHovered = index === hoveredIndex;
            return (
                <div className='flex flex-col text-white border mt-7'
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                >
        <div className='flex flex-row justify-between items-center gap-5 p-5 border-b'>
            <div className='flex flex-col gap-5'>
                <div className='flex flex-row gap-3 items-center'>
                    <p>{user?.firstName + " " + user?.lastName +","}</p>
                    <p>9589068752</p>
                </div>
                <div className='uppercase'>
                    {currentItem?.address + "," + currentItem?.country}
                </div>
            <div>
                {currentItem?.zipcode}
            </div>
            </div>
            <div className='relative cursor-pointer'>
            <HiOutlineDotsVertical />
            {isHovered && 
            <div className='absolute flex flex-col bg-white p-2 right-[6px] -top-[20px]'>
                <p className='text-richblack-800 hover:text-richblue-200'>Edit</p>
                <p className='text-richblack-800 mt-1' onClick={()=>deleteAddress(currentItem?._id)}>Delete</p>
            </div>
}
            </div>
        </div>
    </div>
            )
        })
    
}
</div>
  )
}

export default ShowUserAddress