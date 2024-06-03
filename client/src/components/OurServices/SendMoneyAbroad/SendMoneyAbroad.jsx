import React, { useEffect, useState } from "react";
import "../assets/css/ourservices.css";
import image1 from "../assets/img/send.jpeg";
import countriesList from "../../../utils/countryList";
import SendMoneyForm1 from "./SendMoneyForm1";
import SendMoneyForm2 from "./SendMoneyForm2";
import SendMoneyForm3 from "./SendMoneyForm3";
import SendMoneyBifurcation from "./SendMoneyBifurcation";
import { useSelector } from "react-redux";
import Modal from "../../Modal";
import SendMoneyLogin from "../../SendMoneyLogin";
import SendMoneyRegister from "../../SendMoneyRegister";
import SendMoneyForm2Customer from "./SendMoneyForm2Customer";

export default function SendMoneyAbroad() {
  const user = useSelector((state) => state.profile.user?.email);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formStep, setformStep] = useState(4);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [tabName, setTabName] = useState("Login");
  const isUserLoggedIn = localStorage.getItem("sendmoneyloggedin") === 'true';
  const [chargesData, setChargesData] = useState();

  const [documentProof, setDocumentProofs] = useState({
    panCardImage: "",
    passportImage: "",
    blockACSheetDoc: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoggedIn(isUserLoggedIn);
  }, [isUserLoggedIn]);

  const getTabName = (data) => {
    setTabName(data);
  };

  const fetchChargesData = (data) => {
    setChargesData(data);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center my-4 text-3xl mt-10 mb-10">SEND MONEY ABROAD</h2>

      <div className="bg-[#e7e7e7] p-5">
        <p>
          Global Connectivity, Trusted Security: Send Money Abroad with Confidence. Your Reliable
          Partner for International Transactions, Ensuring Peace of Mind Every Step of the Way.
          Seamlessly Connect Across Borders, Safeguarding Your Funds with Advanced Security Measures.
          Experience Effortless Transfers, Wherever You Are in the World.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="p-4">
          {formStep !== 5 && (
            <>
              <div className="sma_pclara bg-white shadow-lg rounded-lg p-6">
                {formStep === 0 && (
                  <>
                    <SendMoneyForm1
                      setformStep={setformStep}
                      isLoggedIn={isLoggedIn}
                      fetchChargesData={fetchChargesData}
                      setShowLoginModal={setShowLoginModal}
                    />
                  </>
                )}
                {formStep === 1 && isLoggedIn && (
                  <>
                    <SendMoneyForm2
                      setformStep={setformStep}
                      documentProof={documentProof}
                      setDocumentProofs={setDocumentProofs}
                    />
                  </>
                )}

                {formStep === 2 && isLoggedIn && (
                  <>
                    <SendMoneyForm2Customer
                      setformStep={setformStep}
                      documentProof={documentProof}
                      setDocumentProofs={setDocumentProofs}
                    />
                  </>
                )}

                {formStep === 3 && isLoggedIn && (
                  <>
                    <SendMoneyForm3 setformStep={setformStep} documentProof={documentProof} />
                  </>
                )}

                {formStep === 4 && isLoggedIn && (
                  <>
                    <SendMoneyBifurcation
                      setformStep={setformStep}
                      documentProof={documentProof}
                      chargesData={chargesData}
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

      { !isLoggedIn && showLoginModal && (
        <Modal
          isVisible={true}
          onClose={() => setShowLoginModal(false)}
          setShowLoginModal={setShowLoginModal}
          tabName={tabName}
          getTabName={getTabName}
        >
          {tabName === "Login" ? (
            <SendMoneyLogin setIsLoggedIn={setIsLoggedIn} setShowLoginModal={setShowLoginModal}/>
          ) : (
            <SendMoneyRegister />
          )}
        </Modal>
      )}
    </div>
  );
}
