import React, { useState } from 'react'
import { AiOutlineSwap } from "react-icons/ai";

const Send = () => {
  const[sendAmount,setSendAmount]=useState(100000)
  const[recievedAmount,setRecievedAmount]=useState(1137.32)
  return (
    <div className='p-5 flex flex-col'>
      <h1>Send Money Online</h1>
      <p className='mt-5'>Your receiver's country and send amount</p>
      
      <div className='mt-5'>
        <select className="w-full md:w-[40%] bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:border-blue-300">
    <option value="US" selected>United States</option>
    <option value="CA">Canada</option>
    <option value="UK">United Kingdom</option>
    <option value="AU">Australia</option>
    {/* Add more options as needed */}
</select>

<div className='flex flex-col md:flex-row md:w-[40%] justify-between items-center'>

<div className="relative mt-7  border border-gray-300 w-full md:w-[40%] flex flex-col justify-center p-2">
  <p>Sending Currency</p>
    <input
        type="text"
        value="INR"
        onChange={(e)=>setSendAmount(e.target.value)}
        className="bg-white rounded-md shadow-sm  focus:outline-none"
    />
</div>


<div className="relative mt-7  border border-gray-300 w-full md:w-[40%] flex flex-col justify-center p-2">
  <p>Recieve Currency</p>
    <input
        type="text"
        value="USD"
        onChange={(e)=>setRecievedAmount(e.target.value)}
        className="bg-white rounded-md shadow-sm focus:outline-none  border-none outline-none focus:outline-none"
    />
</div>



</div>

<div className='flex flex-col md:flex-row md:w-[40%] justify-between items-center'>

<div className="relative mt-7  border border-gray-300 w-full md:w-[40%] flex flex-col justify-center p-2">
  <p>Send Amount</p>
    <input
        type="text"
        value={sendAmount}
        onChange={(e)=>setSendAmount(e.target.value)}
        className="bg-white rounded-md shadow-sm  focus:outline-none"
    />
</div>

<AiOutlineSwap size={30} className='mt-7 md:mt-0'/>

<div className="relative mt-7  border border-gray-300 w-full md:w-[40%] flex flex-col justify-center p-2">
  <p>Recieve Amount</p>
    <input
        type="text"
        value={recievedAmount}
        onChange={(e)=>setRecievedAmount(e.target.value)}
        className="bg-white rounded-md shadow-sm focus:outline-none  border-none outline-none focus:outline-none"
    />
</div>



</div>

<div className='mt-7 w-full md:w-[40%]'>
  <p>You can send up to 10,000 USD equivalent in INR for the purpose of Overseas Education. For other purposes you can send up to 5,000 USD equivalent in INR.</p>
</div>

<div>
  <p className='mt-5 font-bold'>1.00 INR = 0.0188 USD</p>
</div>

      </div>

    </div>
  )
}

export default Send