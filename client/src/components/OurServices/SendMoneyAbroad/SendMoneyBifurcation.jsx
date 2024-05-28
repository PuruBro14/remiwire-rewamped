import React, {  useState,useEffect } from "react";
import axios from "axios";
import {load} from '@cashfreepayments/cashfree-js'
import {useParams} from 'react-router-dom';
import { useSelector } from "react-redux";
export default function SendMoneyBifurcation({ setformStep, documentProof }) {

    const [orderId, setOrderId] = useState("");
    const params=useParams();
    const isSessionId=params.sessionid
      const { oneEurotoINR,receivingAmountInEuro,receivingAmountInINR } = useSelector((state) => state.sendMoneyAboroadForms);

    console.log('oneEurotoINR',oneEurotoINR,receivingAmountInEuro,receivingAmountInINR);

    const[sessionId,setSessionId]=useState('');
  const [file, setFile] = useState(null);

  const localStorageOrderId=localStorage.getItem("orderId")

  console.log('localStorageOrderId',localStorageOrderId);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8100/api/upload-document/${orderId}", formData);
      alert("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
      alert("Error uploading file. Please try again.");
    }
  };

  let cashfree;

  let insitialzeSDK = async function () {

    cashfree = await load({
      mode: "sandbox",
    })
  }

  insitialzeSDK()

  const getSessionId=async()=>{
    try {
      let res=await axios.post("http://localhost:8100/payment");
      console.log('res',res);
      if(res.data){
        console.log('res',res);
        setSessionId(res.data.payment_session_id)
        setOrderId(res.data.order_id)
        localStorage.setItem('orderId',res.data.order_id)
        return res.data.payment_session_id
      }
    } catch (error) {
      console.log('error----->',error);
    }
  }

  const verifyPayment = async () => {
    try {
      
      let res = await axios.post("http://localhost:8100/verify", {
        orderId: orderId
      })

      if(res && res.data){
        alert("payment verified")
      }

    } catch (error) {
      console.log(error)
    }
}

const handlePayment = async (e) => {
  e?.preventDefault();
  try {
    let sessionId = await getSessionId();
    console.log('sessionId',sessionId);

    let checkoutOptions = {
      paymentSessionId: sessionId,
      redirectTarget: "_modal"
    };

    cashfree.checkout(checkoutOptions).then((res) => {
      console.log("Payment initialized");
      if (res.error) {
        console.log('result error', res.error.message);
      }

      console.log('res',res);

      if (res) {
        console.log("Redirection");
        verifyPayment();
        console.log('this done');
        fetchStatus()
        console.log('this not done end----->');
      }
    });
  } catch (error) {
    console.log('error', error);
  }
}

console.log('orderId',orderId);


const fetchStatus = async () => {
  console.log('this called fetch status');
  try {
    const orderId = localStorageOrderId; 
    console.log('OrderId:', orderId);
    const response = await axios.get(`http://localhost:8100/api/status/${orderId}`);
    console.log('Response:', response.data); 

  } catch (error) {
    console.log('Error:', error); 
  }
};




// async function sendDocumentVerificationRequest() {
//   const API_URL = `https://sandbox.cashfree.com/pg/lrs/orders/${orderId}/documents/upload`;
//   const fileName = "KYC_PASSPORT_STUDENT_1_lrsDoc.pdf";

//   const formData = new FormData();
//   formData.append("files", fileName);

//   try {
//     const response = await axios.post(API_URL, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         "x-client-id": "{client_id_lrs}",
//         "x-client-secret": "{client_secret_lrs}",
//         "x-api-version": "2023-03-01",
//       },
//     });

//     console.log('Response from document verification API:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error during document verification:', error.response?.data || error.message);
//     throw error;
//   }
// }



useEffect(()=>{
  setSessionId(isSessionId)
},[isSessionId])

  return (
    <div>
      <div className="text-[18px]">Total Charges Bifurcation</div>
      <div className="bg-[#e7e7e7] mt-5 p-5">
        <table className="text-[12px]">
          <tbody>
            <tr>
              <td>
                Exchange Rate
                <div className="font-bold">{oneEurotoINR}</div>
              </td>
              <td>
                Transfer Amount in FCY
                <div className="font-bold">{receivingAmountInEuro}</div>
              </td>
              <td>
                Total Funding Amount in INR
                <div className="font-bold">{receivingAmountInINR}</div>
              </td>
            </tr>
            <tr>
              <td>
                Remittance Service Charge
                <div className="font-bold">1000 ₹</div>
              </td>
              <td>
                GST on Charge
                <div className="font-bold">{((receivingAmountInINR*18)/100).toFixed(2)}</div>
              </td>
              <td>
                GST on Currency Conversion
                <div className="font-bold">10</div>
              </td>
            </tr>
            <tr>
              <td>
                TCS
                <div className="font-bold">100</div>
              </td>
              <td>
                TCS Flag
                <div className="font-bold">100</div>
              </td>
              <td>
                Total of all Charges and Taxes
                <div className="font-bold">  {(1000 + (receivingAmountInINR * 18) / 100 + 10 + 100).toFixed(2)}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="w-full">
          <button
          onClick={handlePayment}
            type="submit"
            className="w-[100%] mt-[30px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Proceed to Checkout
          </button>
        </div>
{/* 
        <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Document</button> */}
      </div>
    </div>
  );
}