import React from "react";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import AboutUsImage from "../HomePage/assets/images/AboutUs.jpg";
import './AboutUs.css'

export default function AboutUs() {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto">
      <div>
        <div>
          
          <div className="mt-4">
                <h1 className="text-4xl font-semibold text-center my-7">About Us</h1>
            <div className="flex flex-col justify-center md:flex-row items-center">

              <div className="md:w-[70%]">
                <div className="flex flex-col md:flex-row mt-5">
                  <div className="text-whi text-justify leading-6 text-sm">
                    <p className="paragraph">
                    We are a team of dedicated professionals who are going to disrupt the foreign exchange industry by providing transparent, secure and hassle-free foreign exchange services at convenience rates.
                    We are partnered with RBI authorised dealer Banks, authorised dealer under category II and forex correspondence for providing fast and reliable foreign exchange services of different purposes under LRS (Liberalised Remittance Scheme) scheme.  
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-[100%] md:w-[30%] flex justify-end  items-end mt-7">
                <img
                  src={AboutUsImage}
                  className="h-[300px]  object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
