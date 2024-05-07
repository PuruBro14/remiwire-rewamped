import React from "react";
import pagenotFound from "../assets/images/pagenotfound.jpeg";
const Error = () => {
  return (
    <div className=" flex flrx-row justify-center items-center text-3xl text-red mt-10">
      <img src={pagenotFound} alt="Page Not Found 404" className="w-[50%]" />
    </div>
  );
};

export default Error;