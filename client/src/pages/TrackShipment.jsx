import React, { useState } from "react";

const TrackShipment = () => {
  const [trackingNumber, setTrackingNumber] = useState();
  return (
    <div>
      <div className="h-[40vh] flex flex-col my-7 w-full justify-center items-center mx-auto">
        <h2 className="text-[50px]">TRACK & TRACE</h2>
        <div className="p-3 w-full md:w-1/2 flex items-center">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter your tracking number"
            className="border my-7 p-3 w-full"
          />
          <button className="px-12 text-white h-[50px] bg-[#d40511] rounded-none hover:bg-[#d40511]">
            Track
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackShipment;