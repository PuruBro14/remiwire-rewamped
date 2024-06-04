import React, { useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import { deleteExistingAddress, fetchDeliveryAddress } from '../../services/operations/SettingsApi';
import { setUser } from '../../utils/profileSlice';

const ShowUserAddress = ({deliveryAddress,setDeliveryAddress}) => {
    const dispatch=useDispatch();
    const{user}=useSelector((state)=>state.profile)
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const[loading,setLoading]=useState(false);
    const{token}=useSelector((state)=>state.auth)

    console.log('deliveryAddress',deliveryAddress);

const deleteAddress = async (addressId) => {  
  try {
    await deleteExistingAddress({ addressId }, token);

    const result = await fetchDeliveryAddress(token,dispatch,user, setUser);
    if (result) {
      setDeliveryAddress(result);
    }
  } catch (error) {
    console.error("Error deleting address:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
    {
        deliveryAddress?.slice(-3)?.map((currentItem,index)=>{
            console.log('currentItem',currentItem);
            const isHovered = index === hoveredIndex;
            return (
                <div className='flex flex-col text-richblack-5 border mt-7'
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                >
        <div className='flex flex-row justify-between items-center gap-5 p-5 border-b'>
            <div className='flex flex-col gap-5'>
                <div className='flex flex-row gap-3 items-center text-richblack-800'>
                    <p>{currentItem?.fullName}</p>
                    <p>{currentItem?.phone}</p>
                </div>
                <div className='uppercase text-richblack-800'>
                    {currentItem?.address + "," + currentItem?.country}
                </div>
            <div className='uppercase text-richblack-800'>
                {currentItem?.zipcode}
            </div>
            </div>
            <div className='relative cursor-pointer'>
            <HiOutlineDotsVertical className='text-black'/>
            {isHovered && 
            <div className='absolute flex flex-col bg-white p-3 right-[6px] -top-[20px]'>
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