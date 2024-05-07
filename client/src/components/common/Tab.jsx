import React from "react";

const Tab = ({
  tabData,
  currentState,
  setCurrentState,
  setPassedFromSignup,
}) => {
  const handleTabClick = (tabName) => {
    setCurrentState(tabName);
    setPassedFromSignup(true);
  };
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
      }}
      className={`flex cursor-pointer items-center bg-richblack-600  gap-x-1 rounded-full max-w-max text-white 
    
    `}
    >
      {tabData?.map((tab) => (
        <div
          key={tab?.id}
          onClick={(e) => {
            e.preventDefault();
            handleTabClick(tab?.tabName);
          }}
          className={`${
            currentState === tab?.tabName
              ? "p-4 bg-richblack-800 text-richblack-5"
              : "bg-transparent text-richblack-200"
          }py-0 px-8 rounded-full transition-all duration-200`}
        >
          {tab?.tabName}
        </div>
      ))}
    </div>
  );
};

export default Tab;
