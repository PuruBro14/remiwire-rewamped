import React, { useEffect } from "react";
import "./assets/css/whyremiwire.css";
import AOS from "aos";
import "aos/dist/aos.css";
import image1 from "./assets/img/bestrate.jpg";
import image2 from "./assets/img/secure.jpg";
import image3 from "./assets/img/tranparency.jpeg";
import image4 from "./assets/img/simple.png";
import image5 from "./assets/img/connected.jpg";
export default function WhyRemiwire() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <section id="timeline">
        <h1>Why should you choose remiwire</h1>

        <div className="demo-card-wrapper">
          <div className="demo-card demo-card--step1" data-aos="fade-right">
            <div className="head">
              <div className="number-box">
                <span>01</span>
              </div>
              <h2>Best Rate</h2>
            </div>
            <div className="body">
              <p>We offer best exchange rates with no hidden fees</p>
              <img src={image1} alt="Best Rates" />
            </div>
          </div>

          <div className="demo-card demo-card--step2" data-aos="fade-left">
            <div className="head">
              <div className="number-box">
                <span>02</span>
              </div>
              <h2>Secure & Cost-effective</h2>
            </div>
            <div className="body">
              <p>Cross-border transfers made simple, fast, and secure</p>
              <img src={image2} alt="Secure & Cost-effective" />
            </div>
          </div>

          <div className="demo-card demo-card--step3" data-aos="fade-right">
            <div className="head">
              <div className="number-box">
                <span>03</span>
              </div>
              <h2>Transaparente</h2>
            </div>
            <div className="body">
              <p>
                Trusted by parents to meet the foreign exchange needs of their
                children overseas and receive currency alerts while in control
              </p>
              <img src={image3} alt="Transaparente" />
            </div>
          </div>

          <div className="demo-card demo-card--step4" data-aos="fade-left">
            <div className="head">
              <div className="number-box">
                <span>04</span>
              </div>
              <h2>Simple</h2>
            </div>
            <div className="body">
              <p>Our easy-to-use apps make sending money easy & effortless.</p>
              <img src={image4} alt="Simple" />
            </div>
          </div>

          <div className="demo-card demo-card--step5" data-aos="fade-right">
            <div className="head">
              <div className="number-box">
                <span>05</span>
              </div>
              <h2>Customer Connectedness</h2>
            </div>
            <div className="body">
              <p>
                Customer service provides us with an edge to outperform. We
                consider our customers to be our most valuable brand
                ambassadors.
              </p>
              <img src={image5} alt="Customer Connectedness" />
            </div>
          </div>
          <div className="demo-card demo-card--step5" data-aos="fade-left">
            <div className="head">
              <div className="number-box">
                <span>06</span>
              </div>
              <h2>Secure & Cost-effective</h2>
            </div>
            <div className="body">
              <p>Cross-border transfers made simple, fast, and secure</p>
              <img src="http://placehold.it/1000x500" alt="Graphic" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
