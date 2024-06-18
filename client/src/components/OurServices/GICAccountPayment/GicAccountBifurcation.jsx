import React, { useState, useEffect } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useSelector } from "react-redux";
import { apiConnector } from "../../../services/operations/apiconnector";
import toast from "react-hot-toast";

export default function GicAccountBifurcation({ setFormStep, documentProof, fxRate }) {
  const [orderId, setOrderId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const params = useParams();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const isSessionId = params.sessionid;
  const { oneEurotoINR, receivingAmountInEuro, receivingAmountInINR } =
    useSelector((state) => state.sendMoneyAboroadForms);
  const { token } = useSelector((state) => state.auth);

  const [sessionId, setSessionId] = useState("");

  const [cashfree, setCashfree] = useState(null);

  const initializeSDK = async () => {
    try {
      const cashfree = await load({ mode: "sandbox" });
      setCashfree(cashfree);
    } catch (error) {
      console.error("Failed to load Cashfree SDK:", error);
    }
  };

  useEffect(() => {
    initializeSDK();
  }, []);

  const getSessionId = async () => {
    try {
      const res = await apiConnector(
        "POST",
        "http://localhost:8100/api/v1/payment",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (res.data) {
        setSessionId(res.data.payment_session_id);
        setOrderId(res.data.order_id);
        setCustomerId(res.data.customer_id); // Set customer ID
        localStorage.setItem("orderId", res.data.order_id);
        return res.data.payment_session_id;
      }
    } catch (error) {
      console.log("error----->", error);
    }
  };

  const handlePayment = async (e) => {
    e?.preventDefault();
    try {
      let sessionId = await getSessionId();
      console.log("sessionId", sessionId, cashfree);

      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then((res) => {
        console.log("Payment initialized");
        if (res.error) {
          console.log("result error", res.error.message);
        }

        console.log("res", res);

        if (res) {
          console.log("Redirection");
          verifyPayment(token);
          console.log("this done");
          console.log("this not done end----->");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("orderId", orderId);

  const verifyPayment = async (token) => { 
  if (!token) {
    console.error('Token is required for authentication');
    return;
  }

  const orderId = localStorage.getItem('orderId');
  if (!orderId) {
    console.error('Order ID is missing');
    return;
  }

  const toastId = toast.loading("Verifying payment...");

  try {
    let res = await apiConnector(
      "POST",
      "http://localhost:8100/api/v1/verify",
      {
        orderId: orderId,
        serviceType: "GICAccountPayment"
      },
      {
        Authorization: `Bearer ${token}` // Pass headers directly here
      },
    );

    if (res && res.data) {
      toast.success("Payment verified");
      alert("Payment verified");
      setIsPaymentVerified(true);
    } else {
      toast.error("Payment verification failed");
      console.error("Unexpected response format", res);
    }
  } catch (error) {
    toast.error("Payment verification failed");
    console.error("Error during payment verification", error);
  } finally {
    toast.dismiss(toastId);
  }
};

  useEffect(() => {
    setSessionId(isSessionId);
    getSessionId();
  }, [isSessionId]);

  console.log("fxRate----------->", fxRate, isPaymentVerified);

  return (
    <div>
      {isPaymentVerified ? (
        <div className="text-[18px]">
          Thank you for your payment! Your order is placed successfully.
          <br />
          Your Order ID: {orderId}
          <button
            onClick={() => navigate("/my-orders")}
            className="mt-4 text-blue-600 underline"
          >
            Go to My Orders to track your recent orders.
          </button>
        </div>
      ) : (
        <>
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
                    <div className="font-bold">{fxRate?.gst}</div>
                  </td>
                  <td>
                    GST on Currency Conversion
                    <div className="font-bold">10</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    TCS
                    <div className="font-bold">{fxRate?.tcs}</div>
                  </td>
                  <td>
                    TCS Flag
                    <div className="font-bold">100</div>
                  </td>
                  <td>
                    Total of all Charges and Taxes
                    <div className="font-bold">{fxRate?.amount_to_pay}</div>
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
          </div>
        </>
      )}
    </div>
  );
}
