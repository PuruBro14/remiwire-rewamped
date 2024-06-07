import React, { useEffect, useState } from "react";
import "../assets/css/ourservices.css";
import image1 from "../assets/img/blocked.jpg";
import countriesList from "../../../utils/countryList";
import GICAccountForm1 from "./GICAccountForm1";
import GICAccountForm2 from "./GICAccountForm2";
import GICAccountForm3 from "./GICAccountForm3";
import SendMoneyLogin from "../../SendMoneyLogin";
import SendMoneyRegister from "../../SendMoneyRegister";
import { useSelector } from "react-redux";
import GicAccountBifurcation from "./GicAccountBifurcation";

export default function GICAccountHome() {
   const {token}=useSelector((state)=>state.auth)
    const [tabName, setTabName] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    return token || false;
  });
  const isUserLoggedIn = localStorage.getItem("sendmoneyloggedIn") === 'true';
  const [formData, setFormData] = useState({
    transferFromCountry: "India",
    transferFromState: "",
    transferFromCity: "",
    purpose: "Blocked Account Payment",
    transferTo: "Canada",
    receivingCurrency: "Cad",
  });
  const [formStep, setFormStep] = useState(0);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [documentProof, setDocumentProofs] = useState({
    panCardImage: "",
    passportImage: "",
    blockACSheetDoc: "",
  });

   const [chargesData, setChargesData] = useState();
   
   const[fxRate,setFxRate]=useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
    // make axios request
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      console.log('runned------>');
      setIsLoggedIn(true)
      setShowLoginModal(false)
    }
  }, [token]);

  const getTabName = (data) => {
    setTabName(data);
  };

  const fetchChargesData = (data) => {
    setChargesData(data);
  };

  const getShowModalData=(data)=>{
    console.log('-------------->data',data);
    setShowLoginModal(data)
  }

  console.log('isLoggedIn', isLoggedIn, showLoginModal, 'formStep', formStep, isUserLoggedIn);

  const fetchFxDetails=(data)=>{
    console.log('data',data);
    setFxRate(data)
  }


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
          {formStep !== 4 && (
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
                    <GICAccountForm1 setFormStep={setFormStep}
                      isLoggedIn={isLoggedIn}
                      fetchChargesData={fetchChargesData}
                      setShowLoginModal={setShowLoginModal}
                      getShowModalData={getShowModalData} />
                  </>
                )}
                {formStep === 1 && (
                  <>
                    <GICAccountForm2
                      setFormStep={setFormStep}
                      documentProof={documentProof}
                      setDocumentProofs={setDocumentProofs}
                      fetchFxDetails={fetchFxDetails}
                    />{" "}
                  </>
                )}

                {formStep === 2 && (
                  <>
                    <GICAccountForm3
                      setFormStep={setFormStep}
                      documentProof={documentProof}
                    />
                  </>
                )}

                  {formStep === 3 && (
                  <>
                    <GicAccountBifurcation
                      setFormStep={setFormStep}
                      documentProof={documentProof}
                      setDocumentProofs={setDocumentProofs}
                      fetchFxDetails={fetchFxDetails}
                      fxRate={fxRate}
                    />{" "}
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
            <SendMoneyLogin setIsLoggedIn={setIsLoggedIn} setShowLoginModal={setShowLoginModal}/>
          ) : (
            <SendMoneyRegister />
          )}
        </Modal>
      )}
    </div>
  );
}
