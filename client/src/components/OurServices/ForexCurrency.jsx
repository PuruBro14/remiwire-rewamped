import React, { useEffect } from "react";
import "./assets/css/ourservices.css";
import image1 from "./assets/img/forex.jpg";
import Convert from "../HomePage/Convert";
export default function ForexCurrency() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center my-4 text-3xl mt-10 mb-10">FOREX CURRENCY EXCHANGE</h2>
        <Convert/>
    </div>
  );
}
