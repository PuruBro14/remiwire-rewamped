import React, { useEffect, useState } from 'react'
import {useDispatch} from "react-redux";
import { setStep } from '../../utils/bookCurrencySlice';
import { IoIosArrowDown } from "react-icons/io";
import {useSelector} from "react-redux";
import { logout, setLogin } from '../../services/operations/authAPI';
import {useNavigate} from "react-router-dom"
const   LoginCheckout = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const {user}=useSelector((state)=>state.profile)
  const[showAccordionData,setShowAccordionData]=useState(true);
  const dispatch=useDispatch();
  const[isLoggedIn,setIsLoggedIn]=useState(false);
  const[loginFromCheckout,setLoginFromCheckout]=useState(false);
  const navigate=useNavigate();
  const handleCheckout=()=>{
    dispatch(setStep(2))
  }

  const toggleAccordion=()=>{
    setShowAccordionData(!showAccordionData);
  }

  useEffect(()=>{
    if(user){
      setIsLoggedIn(true)
    }
  },[user])

   const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const loginHandler=()=>{
    setLoginFromCheckout(true)
     dispatch(setLogin(email, password, navigate))
  }

  const redirectToLogin=(e)=>{
    e.preventDefault();
    dispatch(logout(navigate))
    navigate('/signup')
  }

  console.log('isLoggedIn',isLoggedIn,'loginFromCheckout',loginFromCheckout);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex flex-col'>

      <div className='relative flex flex-row gap-x-4 h-12 items-center p-5 bg-gradient-to-b from-[#FF512F] to-[#F09819]'>
        <span className='text-white'>1</span>
        <span className='text-white uppercase'>Login</span>
        <IoIosArrowDown className='text-white text-[25px] absolute right-10 cursor-pointer' onClick={toggleAccordion}/>
      </div>

      {showAccordionData && 
      <div className='flex flex-col gap-y-5 p-8 shadow-md bg-white text-richblack-800'>

        {/* before note  */}
        <div className='flex flex-row justify-between'>

          {isLoggedIn ?
          <div className='flex flex-col gap-y-2'>

             <div className='flex flex-row gap-x-2'>
              <span className=' text-[18px]'>Name:</span>
              <span className=' text-[18px]'>{user?.firstName + " " + user?.lastName}</span>
            </div>

            <div className='flex flex-row gap-x-2'>
              <span className=' text-[18px]'>Email:</span>
              <span className=' text-[18px]'>{user?.email}</span>
            </div>

            {user?.additionalDetails?.contactNumber &&
            <div className='flex flex-row gap-x-2'>
              <span className=' text-[18px]'>Phone:</span>
              <span className=' text-[18px]'>{user?.phoneNo}</span>
            </div>
}

            <div>
              <p className='text-[18px] cursor-pointer' onClick={(e)=>redirectToLogin(e)}>Logout & Sign in to another account</p>
            </div>

            <button onClick={handleCheckout} className='bg-gradient-to-b from-[#FF512F] to-[#F09819] px-[18px] py-[12px] rounded-full mt-3 text-white'>
              Continue Checkout
            </button>

        </div>
          :
          <div>
            <div>
              <input type="text" name="email" placeholder='Enter Email/Mobile number' value={email} onChange={(e) => handleOnChange(e)} className='relative mt-3 p-3 rounded-lg bg-richblack-500 text-white w-full'/>

              <input type="password" name="password" placeholder='Enter Password' value={password} onChange={(e) => handleOnChange(e)} className='relative mt-5 p-3 rounded-lg bg-richblack-500 text-white w-full'/>
              
              </div>

              <div>
                <button className='bg-gradient-to-b from-[#FF512F] to-[#F09819] px-[40px] py-[15px] rounded-full mt-5 text-white' onClick={loginHandler}>Login</button>
                </div>
              <div className='mt-4  text-[16px]'>
                By continuing,you agree to Remiwire's Terms of Use and Privacy Policy
              </div>
            </div>
}

          <div className='flex flex-col gap-y-2'>
            <div className=' text-xl'>Advantage of secure login</div>
            <div className=' text-[18px]'>
              Easily Track Orders
            </div>

            <div className=' text-[18px]'>
              Get Relevant Alerts
            </div>
          </div>

        </div>

        {/* after div  */}

        <div>
          <p className=' text-[18px]'>Note that upon clicking <span className='font-bold'>Logout</span> you will lose all items you booked and will be redirected to Remiwire home page.</p>
        </div>

      </div>
}

    </div>
  )
}

export default LoginCheckout