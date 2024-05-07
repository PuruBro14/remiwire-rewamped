import React, { useState } from "react";
import Tab from "../common/Tab";
import SignupForm from "../Auth/SignupForm";
import Login from "../Form/Login";

const SignUp = () => {
  const[currentState,setCurrentState]=useState("Signup")
  const[passedFromSignup,setPassedFromSignup]=useState(false);

  return (
    <div className="bg-richblack-900 py-10 lg:pt-0">
      <div className="lg:h-[100px]"></div>
      <div className="w-11/12 mx-auto justify-center flex flex-row">
        {/* first div  */}
        <div className="flex flex-col w-[80%]">
          <SignupForm/>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
