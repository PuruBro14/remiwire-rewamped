import React, { useEffect, useState } from "react";
import "../assets/css/ourservices.css";
import image1 from "../assets/img/nri.jpg";
import NRIRepatriationForm1 from "./NRIRepatriationForm1";
import NRIRepatriationForm2 from "./NRIRepatriationForm2";
import NRIRepatriationForm3 from "./NRIRepatriationForm3";
import SendMoneyLogin from "../../SendMoneyLogin";
import SendMoneyRegister from "../../SendMoneyRegister";
import NRIRepatrirationCustomer from "./NRIRepatriration";
import NRIRepatriationBifurcation from "./NRIRepatriationBifurcation";
import { useSelector } from "react-redux";

export default function NRIRepatriation() {
  const { token } = useSelector((state) => state.auth);
  const [chargesData, setChargesData] = useState();
  const [tabName, setTabName] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    return token || false;
  });
  const [formStep, setFormStep] = useState(2);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [documentProof, setDocumentProofs] = useState({
    panCardImage: "",
    passportImage: "",
    blockACSheetDoc: "",
  });

  const [fxRate, setFxRate] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
    }
  }, [token]);

  const getTabName = (data) => {
    setTabName(data);
  };

  const fetchChargesData = (data) => {
    setChargesData(data);
  };

  const getShowModalData = (data) => {
    setShowLoginModal(data);
  };

  const fetchFxDetails = (data) => {
    setFxRate(data);
  };

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
          {formStep !== 5 && (
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
                    <NRIRepatriationForm1
                      setFormStep={setFormStep}
                      isLoggedIn={isLoggedIn}
                      fetchChargesData={fetchChargesData}
                      setShowLoginModal={setShowLoginModal}
                      getShowModalData={getShowModalData}
                    />
                  </>
                )}
                {formStep === 1 && (
                  <>
                    <NRIRepatriationForm2
                      setFormStep={setFormStep}
                      documentProof={documentProof}
                      setDocumentProofs={setDocumentProofs}
                      fetchFxDetails={fetchFxDetails}
                    />{" "}
                  </>
                )}

                {formStep === 2 && isLoggedIn && (
                  <>
                    <NRIRepatrirationCustomer
                      setFormStep={setFormStep}
                      documentProof={documentProof}
                      setDocumentProofs={setDocumentProofs}
                    />
                  </>
                )}

                {formStep === 3 && (
                  <>
                    <NRIRepatriationForm3
                      setFormStep={setFormStep}
                      documentProof={documentProof}
                    />
                  </>
                )}

                {formStep === 4 && isLoggedIn && (
                  <>
                    <NRIRepatriationBifurcation
                      setFormStep={setFormStep}
                      documentProof={documentProof}
                      chargesData={chargesData}
                      fxRate={fxRate}
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
      {!isLoggedIn && showLoginModal && (
        <Modal
          isVisible={true}
          onClose={() => setShowLoginModal(false)}
          setShowLoginModal={setShowLoginModal}
          tabName={tabName}
          getTabName={getTabName}
        >
          {tabName === "Login" ? (
            <SendMoneyLogin
              setIsLoggedIn={setIsLoggedIn}
              setShowLoginModal={setShowLoginModal}
            />
          ) : (
            <SendMoneyRegister />
          )}
        </Modal>
      )}
    </div>
  );
}
