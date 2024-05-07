import React from "react";
import { Link } from "react-router-dom";
import "./assets/css/howtmoney.css";

import image1 from "./assets/img/createacc.jpg";
import image2 from "./assets/img/enter.jpg";
import image3 from "./assets/img/confirm.jpg";

export default function HowTransferMoney() {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto ">
      <h2 className="htsmoneyhead">How to transfer money in 3 easy steps</h2>
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div className="cardname">
            <img src={image1} className="object-cover" alt="Create account" />
            <div className="cardnameData">
              <h3 className="text-2xl font-semibold">1. Create account</h3>
              <p className="text-md mt-3 text-sm">
                It takes just a few minutes, and all you need is an email
                address.
              </p>
            </div>
          </div>
          <div className="cardname">
            <img src={image2} alt="Enter Details" />
            <div className="cardnameData">
              <h3 className="text-2xl font-semibold">2. Enter details</h3>
              <p className="text-md mt-3  text-sm">
                Add recipient (you'll need their address, bank account/IBAN,
                swift/BIC) and payment information.
              </p>
            </div>
          </div>
          <div className="cardname">
            <img src={image3} />
            <div className="cardnameData">
              <h3 className="text-2xl font-semibold">3. Confirm and send</h3>
              <p className="text-md mt-3  text-sm">
                Check the currencies and amount are correct, get the expected
                delivery date, and send your money transfer.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Link to="login">
          <button className="bg-[#d40511] text-white text-center px-[18px] py-[13px] my-7 mx-auto">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
