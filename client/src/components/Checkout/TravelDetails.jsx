import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { setStep } from '../../utils/bookCurrencySlice';

const TravelDetails = () => {
  const [showAccordionData, setShowAccordionData] = useState(true);
  const [formData, setFormData] = useState({
    nameAsPerPAN: '',
    dateOfBirth: '',
    email: '',
    mobileNo: '',
    panCard: null,
    passport: null,
    ticket: null,
    visaCopy: null,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const dispatch = useDispatch();

  const toggleAccordion = () => {
    setShowAccordionData(!showAccordionData);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    const { nameAsPerPAN, dateOfBirth, email, mobileNo, panCard, passport, ticket, visaCopy } = formData;

    if (nameAsPerPAN && dateOfBirth && email && mobileNo && panCard && passport && ticket && visaCopy) {
      dispatch(setStep(3));
    } else {
      alert('Please fill in all the fields.');
    }
  };

  useEffect(() => {
    const { nameAsPerPAN, dateOfBirth, email, mobileNo, panCard, passport, ticket, visaCopy } = formData;

    setIsFormValid(
      !!nameAsPerPAN &&
      !!dateOfBirth &&
      !!email &&
      !!mobileNo &&
      !!panCard &&
      !!passport &&
      !!ticket &&
      !!visaCopy
    );
  }, [formData]);

  return (
    <div className='flex flex-col'>

      <div className='relative flex flex-row gap-x-4 h-12 items-center p-5 bg-gradient-to-b from-[#FF512F] to-[#F09819]'>
        <span className='text-white'>2</span>
        <span className='text-white uppercase'>Travel Details</span>
        <IoIosArrowDown className='text-white text-[25px] absolute right-10 cursor-pointer' onClick={toggleAccordion}/>
      </div>

      {showAccordionData && (
        <div className='flex flex-col gap-y-5 p-8 shadow-md'>
          <div className='grid grid-cols-2 gap-4'>
            <input type='text' name='nameAsPerPAN' placeholder='Name as per PAN' className='p-3 rounded-lg border' onChange={handleInputChange} />
            <input type='date' name='dateOfBirth' placeholder='Date of Birth' className='p-3 rounded-lg border' onChange={handleInputChange} />

            <input type='email' name='email' placeholder='Email id' className='p-3 rounded-lg border' onChange={handleInputChange} />
            <input type='tel' name='mobileNo' placeholder='Mobile no' className='p-3 rounded-lg border' onChange={handleInputChange} />

            <div className='flex flex-col p-3'>
              <label htmlFor='panCard'>Upload Pan Card</label>
              <input type='file' name='panCard' id='panCard' accept='image/*' onChange={handleInputChange} className='border p-2' />
            </div>

            <div className='flex flex-col p-3'>
              <label htmlFor='passport'>Upload Passport</label>
              <input type='file' name='passport' id='passport' accept='image/*' onChange={handleInputChange} className='border p-2' />
            </div>

            <div className='flex flex-col p-3'>
              <label htmlFor='ticket'>Upload Ticket</label>
              <input type='file' name='ticket' id='ticket' accept='image/*' onChange={handleInputChange} className='border p-2' />
            </div>

            <div className='flex flex-col p-3'>
              <label htmlFor='visaCopy'>Upload Visa Copy</label>
              <input type='file' name='visaCopy' id='visaCopy' accept='image/*' onChange={handleInputChange} className='border p-2' />
            </div>
          </div>

          <button
            type='button'
            className={`mt-4 p-3 bg-blue-500 text-white rounded-lg ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelDetails;
