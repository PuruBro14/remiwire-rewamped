import React from "react";
import "./assets/css/ourservices.css";
import image1 from "./assets/img/send.jpeg";
import Send from "../HomePage/Send";
export default function SendMoneyAbroad() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center my-4 text-3xl mt-10 mb-10">
        SEND MONEY ABROAD
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4">
          <div assname="sma_pclara">
            <p>
              Send money abroad seamlessly with Remiwire. Fast, secure, and
              reliable transfers at your fingertips. Say goodbye to hidden fees
              and long wait times. Trust Remiwire for swift and affordable forex
              transfers worldwide. Empower your global transactions with
              Remiwire. Experience hassle-free money transfers with competitive
              exchange rates.
            </p>
            <p className="mt-5">
              Unlock a world of possibilities with Remiwire. Transfer money
              overseas effortlessly, ensuring your funds reach their destination
              promptly. Navigating international payments made simple. Choose
              Remiwire for efficient and cost-effective forex transfers
              anywhere, anytime. With Remiwire, sending money abroad is as easy
              as a few clicks. Enjoy peace of mind knowing your funds are
              handled with utmost security and speed.
            </p>{" "}
            <p className="mt-5">
              Why settle for less? Opt for Remiwire and enjoy low fees,
              transparent rates, and lightning-fast transfers for all your
              international remittance needs. Trust Remiwire to bridge the gap
              between borders. Our streamlined forex services ensure your money
              reaches loved ones or business partners swiftly and securely.
              Expand your horizons with Remiwire. Transfer money globally with
              confidence, backed by our commitment to efficiency and
              reliability.
            </p>{" "}
            <p className="mt-5">
              Join countless satisfied customers who rely on Remiwire for their
              international money transfer needs. Experience the convenience of
              sending money abroad with ease.
            </p>
          </div>
        </div>
        <div className="p-4">
          <img src={image1} alt="Prepaid Travel Card" className="w-full" />
        </div>
      </div>
      <Send/>
    </div>
  );
}
