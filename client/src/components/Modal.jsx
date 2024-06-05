import React, { useEffect } from "react";
import Tab from "./common/Tab";

const Modal = ({ isVisible, onClose, children, setShowLoginModal, tabName, getTabName }) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  const tabData = [
    {
      id: 1,
      tabName: "Login",
    },
    {
      id: 2,
      tabName: "Register",
    },
  ];

  return (
    <>
      <div
        id="wrapper"
        className="md:fixed inset-0 top-[70px] bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        onClick={handleClose}
      >
        <div className="w-[600px] flex flex-col max-h-[90vh] overflow-y-auto bg-white rounded">
          <button className="text-xl place-self-end p-2" onClick={onClose}>
            X
          </button>
          <div className="bg-white p-2 rounded">
            <Tab tabData={tabData} setShowLoginModal={setShowLoginModal} getTabName={getTabName} />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
