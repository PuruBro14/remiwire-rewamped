import React, { useEffect, useState } from "react";
import "../assets/css/ourservices.css";
import image1 from "../assets/img/blocked.jpg";
import countriesList from "../../../utils/countryList";
import GICAccountForm1 from "./GICAccountForm1";
import GICAccountForm2 from "./GICAccountForm2";
import GICAccountForm3 from "./GICAccountForm3";

export default function GICAccountHome() {
  const [formData, setFormData] = useState({
    transferFromCountry: "India",
    transferFromState: "",
    transferFromCity: "",
    purpose: "Blocked Account Payment",
    transferTo: "Canada",
    receivingCurrency: "Cad",
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
        GIC ACCOUNT PAYMENT
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
                    Officially approved by the Canada federal Foreign Office.
                  </p>
                  <p className="text-[12px]">
                    Fill up the details below to start your application open
                    Blocked Account at Canada before travel.
                  </p>
                </div>
                {formStep === 0 && (
                  <>
                    {" "}
                    <GICAccountForm1 setformStep={setformStep} />
                  </>
                )}
                {formStep === 1 && (
                  <>
                    <GICAccountForm2
                      setformStep={setformStep}
                      documentProof={documentProof}
                      setDocumentProofs={setDocumentProofs}
                    />{" "}
                  </>
                )}

                {formStep === 2 && (
                  <>
                    <GICAccountForm3
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
