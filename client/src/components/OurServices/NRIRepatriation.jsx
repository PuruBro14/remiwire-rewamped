import React from "react";
import "./assets/css/ourservices.css";
import image1 from "./assets/img/nri.jpg";
export default function NRIRepatriation() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center my-4 text-3xl mt-10 mb-10">
        NRI REPATRIATION
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4">
          <div assname="sma_pclara">
            <p>
              Seamlessly manage your finances abroad with our comprehensive
              suite of services, including hassle-free NRI repatriation
              solutions. Ensure effortless repatriation of funds with Remiwire's
              specialized NRI repatriation services, designed to meet your
              financial needs. <br />
              <br />
              Maximize your earnings overseas with our efficient NRI
              repatriation services, allowing you to transfer funds back home
              with ease. Trust Remiwire to facilitate smooth and secure NRI
              repatriation, providing peace of mind for you and your loved ones.
              Stay connected to your roots while pursuing opportunities abroad.
              <br />
              <br />
              Our NRI repatriation services make sending money home simple and
              stress-free. Experience the convenience of managing your
              international finances with our user-friendly platform, offering
              quick and reliable NRI repatriation options. From earnings to
              investments, our NRI repatriation services ensure that your
              hard-earned money reaches its destination promptly and securely.
              Empower your financial goals with our tailored NRI repatriation
              solutions, designed to help you make the most of your global
              <br />
              <br />
              earnings. Navigate cross-border transactions with confidence. Our
              dedicated team is here to assist you every step of the way with
              our NRI repatriation services. Join the countless NRIs who rely on
              Remiwire for seamless NRI repatriation, delivering peace of mind
              and financial stability across borders.
            </p>
          </div>
        </div>
        <div className="p-4">
          <img src={image1} alt="Prepaid Travel Card" className="w-full" />
        </div>
      </div>
    </div>
  );
}
