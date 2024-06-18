import React, { useEffect, useRef, useState } from "react";
import HeaderBanner from "./assets/images/HeaderBanner.jpg";
import "./assets/css/home.css";
import Contactus from "../ContactUs/Contactus";
import { ContentSlider } from "../CurrencyRate/CurrencyRate";
import WhyRemiwire from "../WhyRemiwire/WhyRemiwire";
import Ourservies from "../OurServices/Ourservies";
import AboutUs from "../AboutUs/AboutUs";
import HowTransferMoney from "../HowTransferMoney/HowTransferMoney";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import NewLandingVideo from '../../assets/images/NewLandingVideo.mp4'
const homeServices = [
  {
    id: 1,
    name: "Convert",
  },
  {
    id: 2,
    name: "Send",
  },
  {
    id: 3,
    name: "Charts",
  },
  {
    id: 4,
    name: "Alerts",
  },
];

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div className="relative">
       <video autoPlay muted loop className="h-full">
        <source src={NewLandingVideo} type="video/mp4" />
        Your browser does not support HTML video and source tags.
        </video>


        <div className="absolute hidden lg:block md:top-[15%] left-[5%] w-[30%] p-10 text-white bg-[#d40511]">
          <h1 className="text-xl md:text-4xl w-[100%]">
            Trusted Global Currency Converter & Money Transfers
          </h1>
          <p className="mt-4 w-[90%]">
            Best source for currency conversion, sending money online and
            tracking exchange ratess
          </p>
        </div>
      </div>
      <div>
        <ContentSlider />
      </div>

      <div>
        <WhyRemiwire />
      </div>

      <div>
        <Ourservies />
      </div>

      <div className=" py-2 pb-10">
        <AboutUs />
      </div>

      <div className="bg-[#F5F7FE]">
        <div className="lg:h-[10px] my-14"></div>
        <HowTransferMoney />
      </div>

      <div>
        <Contactus />
      </div>
    </div>
  );
};

export default Home;
