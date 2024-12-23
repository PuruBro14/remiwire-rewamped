import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedin,
  FaInstagramSquare,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-white shadow-2xl">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 text-richblack-900 leading-6 mx-auto relative py-14">
        <div className="border-b w-[80%] mx-auto flex flex-col lg:flex-row pb-5 border-richblack-900">
          {/* Section 1 */}
          <div className=" flex flex-wrap flex-row justify-between pl-3 lg:pr-5 gap-3  w-full">
            <div className="w-[100%] lg:w-[25%] mb-7 lg:pl-0">
              <h1 className="text-richblack-900 font-semibold text-[16px]">
                Our Services
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                <Link to="/sendmoneyabroad">Send Money Abroad</Link>
                <Link to="/prepaidtravelcard">Prepaid Travel Card</Link>
                <Link to="/forexcurrency">Forex Currency</Link>
                <Link to="/NRIRepatriation">NRI Repatriation</Link>
                <Link to="/BlockedAccountPayment">Blocked Account Payment</Link> 
                <Link to="/gicaccountpayment">GIC Account Payment</Link>
                <Link to="/OverseasEducationLoan">Overseas Education Loan</Link>
                <Link to="/creategicaccount">Create GIC Account</Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[25%] mb-7 lg:pl-0">
              <h1 className="text-richblack-900 font-semibold text-[16px]">
                Legal
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                <Link to="/termsofuse">Terms And Conditions</Link>
                <Link to="/privacypolicy">Privacy Policy</Link>
                <Link to="/cookie">Cookies Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-[80%] flex-row items-center justify-between  text-richblack-400 mx-auto  pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-col md:flex-row w-full justify-between items-center">
            <div className="text-center">
              Copyright © 2024 All Rights Reserved by Remiwire.
            </div>
            <ul className="flex flex-row text-white gap-8 mt-7 md:mt-0">
              <li className="h-10 w-10 bg-richblack-300 rounded-full flex justify-center items-center hover:bg-richblue-500 cursor-pointer transition-all duration-200">
                <Link>
                  <FaFacebookF className="h-5 w-5" />
                </Link>
              </li>
              <li className="h-10 w-10 bg-richblack-300 rounded-full flex justify-center items-center hover:bg-richblue-500 cursor-pointer transition-all duration-200">
                <Link className="twitter" href="#">
                  <FaTwitter className="h-5 w-5" />
                </Link>
              </li>
              <li className="h-10 w-10 bg-richblack-300 rounded-full flex justify-center items-center hover:bg-richblue-500 cursor-pointer transition-all duration-200">
                <Link>
                  <FaInstagramSquare className="h-5 w-5" />
                </Link>
              </li>
              <li className="h-10 w-10 bg-richblack-300 rounded-full flex justify-center items-center hover:bg-richblue-500 cursor-pointer transition-all duration-200">
                <Link>
                  <FaLinkedin className="h-5 w-5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;