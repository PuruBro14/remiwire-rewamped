import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import IconBtn from '../components/common/IconBtn'
import { VscAdd } from "react-icons/vsc"
import OrdersTable from '../components/core/OrdersTable'

const MyOrders = () => {
    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate();
  
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='mb-14'>
        <div className='my-14 flex items-center justify-between w-11/12 mx-auto'>
            <h1 className='text-3xl font-medium text-richblack-800'>My Orders</h1>
            <IconBtn
             text="Buy Currency"
             onclick={()=>navigate("/")}
             >
                <VscAdd/>
            </IconBtn>
        </div>
        <OrdersTable/>
    </div>
  )
}

export default MyOrders