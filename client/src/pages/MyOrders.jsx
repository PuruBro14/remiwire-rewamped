import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import IconBtn from '../components/common/IconBtn'
import { VscAdd } from "react-icons/vsc"
import OrdersTable from '../components/core/OrdersTable'
import axios from "axios";
import {toast} from 'react-hot-toast'
import { apiConnector } from '../services/operations/apiconnector'

const MyOrders = () => {
  const[orders,setOrders]=useState([]);
  const[userOrders,setUserOrders]=useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate();
  
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

const fetchOrderById = async () => {
  try {
    const response = await axios.get(`http://localhost:8100/orders`);
    console.log('Response:', response.data); 
    setOrders(response.data);

  } catch (error) {
    console.log('Error:', error); 
  }
};

  useEffect(()=>{
    fetchOrderById(); 
  },[])

//  useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await fetchUserOrders(token);
//         console.log('data', data);
//         setOrders(data);
//       } catch (error) {
//         console.error('Error fetching user orders:', error);
//       }
//     };

//     fetchOrders();
//   }, [token]);

const fetchUserOrders = async () => {
  try {
    const response = await apiConnector( "GET",
      'http://localhost:8100/api/v1/userOrders',
      null,
      {
        Authorization: `Bearer ${token}`,
      })
    setUserOrders(response?.data?.data) 

  } catch (error) {
    console.log('Error:', error); 
  }
};

  useEffect(()=>{
    fetchUserOrders(); 
  },[token])

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
        <OrdersTable userOrders={userOrders}/>
    </div>
  )
}

export default MyOrders