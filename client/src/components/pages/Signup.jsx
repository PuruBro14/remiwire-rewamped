import React, { useEffect } from "react";
import SignupForm from "../Auth/SignupForm";

const SignUp = ({sendMoneyLoggedIn}) => {

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-10 lg:pt-0">
      <div className="lg:h-[100px]"></div>
      <div className="w-11/12 mx-auto justify-center flex flex-row">
        <div className="flex flex-col md:w-[60%]">
          <SignupForm sendMoneyLoggedIn={sendMoneyLoggedIn}/>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
