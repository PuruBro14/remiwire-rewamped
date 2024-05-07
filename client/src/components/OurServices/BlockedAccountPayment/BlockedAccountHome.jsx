import React, { useEffect, useState } from "react";
import "../assets/css/ourservices.css";
import image1 from "../assets/img/blocked.jpg";
import countriesList from "../../../utils/countryList";
import BlockedAccountForm1 from "./BlockedAccountForm1";
import BlockedAccountForm2 from "./BlockedAccountForm2";
import BlockedAccountForm3 from "./BlockedAccountForm3";

export default function BlockedAccountHome() {
  const [formData, setFormData] = useState({
    transferFromCountry: "India",
    transferFromState: "",
    transferFromCity: "",
    purpose: "Blocked Account Payment",
    transferTo: "Germany",
    receivingCurrency: "Euro",
  });
  const [formStep, setformStep] = useState(0);

  const [documentProof, setDocumentProofs] = useState({
    panCardImage: "",
    passportImage: "",
    blockACSheetDoc: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
    // make axios request
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center my-4 text-3xl mt-10 mb-10">
        GERMAN BLOCKED ACCOUNT
      </h2>

      <div className="bg-[#e7e7e7] p-5">
        <p>
          Secure your future with ease using our blocked account payment
          solutions at Remiwire. Streamline your visa application process with
          our reliable blocked account payment services tailored to your needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="p-4">
          {formStep !== 3 && (
            <>
              <div className="sma_pclara bg-white shadow-lg rounded-lg p-6">
                <div>
                  <p className="text-[20px]">
                    {" "}
                    Officially approved by the German federal Foreign Office.
                  </p>
                  <p className="text-[12px]">
                    Fill up the details below to start your application open
                    Blocked Account at Germany before travel.
                  </p>
                </div>
                {formStep === 0 && (
                  <>
                    {" "}
                    <BlockedAccountForm1 setformStep={setformStep} />
                  </>
                )}
                {formStep === 1 && (
                  <>
                    <BlockedAccountForm2
                      setformStep={setformStep}
                      documentProof={documentProof}
                      setDocumentProofs={setDocumentProofs}
                    />{" "}
                  </>
                )}

                {formStep === 2 && (
                  <>
                    <BlockedAccountForm3
                      setformStep={setformStep}
                      documentProof={documentProof}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
        <div className="p-4">
          <img src={image1} alt="Prepaid Travel Card" className="w-full" />
        </div>
      </div>
    </div>
  );
}
