import React from "react";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import AboutUsImage from "../HomePage/assets/images/AboutUs.jpg";
export default function AboutUs() {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto">
      <div>
        <div>
          <div className="mt-8">
            <div className="flex flex-col justify-center md:flex-row items-center gap-8">
              <div className="md:w-[70%]">
                <h1 className="text-4xl font-semibold text-center">About Us</h1>
                <div className="flex flex-col md:flex-row mt-5">
                  <div className="text-whi text-justify leading-6 text-sm">
                    <p>
                      Welcome to Remiwire Money Exchange, your trusted partner
                      in currency exchange services. With years of experience in
                      the industry, we offer competitive rates and reliable
                      service to meet all your currency exchange needs.
                    </p>
                    <p className="mt-4">
                      At Remiwire Money Exchange, we understand the importance
                      of timely and secure transactions. Whether you are
                      traveling abroad, making international payments, or
                      managing your foreign investments, we strive to make
                      currency exchange fast, easy, and hassle-free.
                    </p>
                    <p className="mt-4">
                      Our team of dedicated professionals is committed to
                      providing you with personalized assistance and expert
                      advice. We value transparency and integrity, ensuring that
                      you receive the best exchange rates with no hidden fees.
                    </p>
                    <p className="mt-4">
                      Choose Remiwire Money Exchange for all your currency
                      exchange requirements and experience peace of mind with
                      every transaction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-[100%] md:w-[40%] flex justify-center">
                <img
                  src={AboutUsImage}
                  className="h-[310px] w-[420px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
