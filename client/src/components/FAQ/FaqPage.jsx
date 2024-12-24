import React, { useState } from "react";
import { faqData } from "../../data/faq-questions";
import './FAQ.css'
import { IoIosArrowDown } from "react-icons/io";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <section className="faq-section">
        <div className="faq-container">
        <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {faqData.map((item, index) => {
             return <div
                key={index}
                className={`faq-item ${openIndex === index ? "active" : ""}`}
              >
                <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="faq-question"
              >
               <span className="text-[1.25rem] text-left text-[hsla(256, 46%, 36%, 1)]">
                    {item.question}
                  </span>
                <IoIosArrowDown
                  className={`faq-icon ${
                    openIndex === index ? "rotate" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <div
                  className="text-[hsla(256, 46%, 36%, 1)] text-[14px]"
                  dangerouslySetInnerHTML={{
                    __html: item.answer || "<p>No content available.</p>",
                  }}
                ></div>
              </div>
)}


              </div>
})}
          </div>
        </div>
      </section>
    </div>
  );
}
