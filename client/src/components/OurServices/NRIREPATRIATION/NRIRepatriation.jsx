import React, { useEffect, useState } from "react";
import "../assets/css/ourservices.css";
import image1 from "../assets/img/nri.jpg";
import countriesList from "../../../utils/countryList";
import NRIRepatriationForm1 from "./NRIRepatriationForm1";
import NRIRepatriationForm2 from "./NRIRepatriationForm2";
import NRIRepatriationForm3 from "./NRIRepatriationForm3";

export default function NRIRepatriation() {
  const [formStep, setformStep] = useState(0);

  const [documentProof, setDocumentProofs] = useState({
    panCardImage: "",
    passportImage: "",
    blockACSheetDoc: "",
  });

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center my-4 text-3xl mt-10 mb-10">
        NRI REPATRIATION
      </h2>

      <div className="bg-[#e7e7e7] p-5">
        <p>
          NRI repatriation services assist non-resident Indians in transferring
          funds, assets, and investments from abroad to their home country.
          These services facilitate smooth repatriation of earnings, ensuring
          compliance with regulations and offering expert guidance in navigating
          financial and legal procedures involved in the repatriation process.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="p-4">
          {formStep !== 3 && (
            <>
              <div className="sma_pclara bg-white shadow-lg rounded-lg p-6">
                <div>
                  <p className="text-[12px]">
                    *ICICI-only NRI repatriation: Ease fund transfer from abroad
                    to India. Compliance ensured, expert guidance provided.
                  </p>
                </div>
                {formStep === 0 && (
                  <>
                    {" "}
                    <NRIRepatriationForm1 setformStep={setformStep} />
                  </>
                )}
                {formStep === 1 && (
                  <>
                    <NRIRepatriationForm2
                      setformStep={setformStep}
                      documentProof={documentProof}
                      setDocumentProofs={setDocumentProofs}
                    />{" "}
                  </>
                )}

                {formStep === 2 && (
                  <>
                    <NRIRepatriationForm3
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
