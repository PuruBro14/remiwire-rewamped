import React from "react";

const Tab = ({ tabData, currentState, setCurrentState, setPassedFromSignup,setShowLoginModal,tabName }) => {
const handleTabClick = (tabName) => {
  setCurrentState(tabName);
};


  return (
    <div className="flex justify-center my-4">
      <div className="flex cursor-pointer items-center gap-x-1 rounded-full bg-richblack-600 text-white p-2 max-w-max shadow-md">
        {tabData?.map((tab) => {
         return <div
            key={tab?.id}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick(tab?.tabName);
            }}
            className={`${
              tabName === tab?.tabName
                ? "bg-blue-500 text-white"
                : "bg-transparent text-gray-700 hover:bg-gray-300"
            } py-2 px-6 rounded-full transition-all duration-300`}
          >
            {tab?.tabName}
          </div>
})}
      </div>
    </div>
  );
};

export default Tab;
