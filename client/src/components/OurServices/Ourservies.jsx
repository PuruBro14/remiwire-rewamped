import React from "react";
import "./assets/css/ourservices.css";
import { Outlet, Link } from "react-router-dom";
export default function Ourservies() {
  return (
    <div className="bg-[#F5F7FE]">
      <div className="ourservies">
        <h1 className="ourserhead">Our Services</h1>

        <div className="flex flex-col md:flex-row" data-aos="fade-up">
          <div className="service service1">
            <img
              src="https://webv2cmsprod.aws.moneygram.com/WEB/release24.01/MGO/US/SENDONLINE/EN/Omnichannel%20-%20Online,0.svg"
              style={{ width: "100px", height: "100px" }}
            />
            <h4>Send Money Abroad</h4>
            <p>
              Global transfers made easy: Send money abroad securely with our
              efficient and reliable services today
            </p>

            <Link to="/sendmoneyabroad">
              <button className="cta">Read More</button>
            </Link>
          </div>

          <div className="service service2">
            <img
              src="https://webv2cmsprod.aws.moneygram.com/WEB/release24.01/MGO/US/SENDONLINE/EN/Omnichannel%20-%20Online,0.svg"
              style={{ width: "100px", height: "100px" }}
            />
            <h4>Prepaid Travel Card</h4>
            <p>
              Your passport to hassle-free spending: Explore the world with
              confidence using our prepaid travel card.
            </p>
            <Link to="/prepaidtravelcard">
              <button className="cta">Read More </button>
            </Link>
          </div>

          <div className="service service3">
            <img
              src="https://webv2cmsprod.aws.moneygram.com/WEB/release24.01/MGO/US/SENDONLINE/EN/Omnichannel%20-%20Online,0.svg"
              style={{ width: "100px", height: "100px" }}
            />
            <h4>Forex Currency</h4>
            <p>
              Unlock global opportunities: Navigate currency markets with
              confidence using our reliable forex currency exchange services.
            </p>
            <Link to="/forexcurrency">
              <button className="cta">Read more</button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row" data-aos="fade-up">
          <div className="service service1">
            <img
              src="https://webv2cmsprod.aws.moneygram.com/WEB/release24.01/MGO/US/SENDONLINE/EN/Omnichannel%20-%20Online,0.svg"
              style={{ width: "100px", height: "100px" }}
            />
            <h4>NRI Repatriation</h4>
            <p>
              Simplify NRI repatriation: Seamlessly transfer funds home with our
              trusted and efficient remittance solutions.
            </p>
            <Link to="/nrirepatriation">
              <button className="cta">Read More </button>
            </Link>
          </div>

          <div className="service service2">
            <img
              src="https://webv2cmsprod.aws.moneygram.com/WEB/release24.01/MGO/US/SENDONLINE/EN/Omnichannel%20-%20Online,0.svg"
              style={{ width: "100px", height: "100px" }}
            />
            <h4>Blocked Account Payment</h4>
            <p>
              Unlock funds securely: Seamlessly manage payments from blocked
              accounts with our reliable financial solutions.
            </p>
            <Link to="/blockedaccountpayment">
              <button className="cta">Read More </button>
            </Link>
          </div>

          <div className="service service3">
            <img
              src="https://webv2cmsprod.aws.moneygram.com/WEB/release24.01/MGO/US/SENDONLINE/EN/Omnichannel%20-%20Online,0.svg"
              style={{ width: "100px", height: "100px" }}
            />
            <h4>Overseas Education Loan</h4>
            <p>
              Realize your global ambitions: Secure your overseas education with
              our tailored and accessible loan options.
            </p>
            <Link to="/overseaseducationloan">
              <button className="cta">Read more</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
