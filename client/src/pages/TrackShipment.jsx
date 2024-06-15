import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/operations/apiconnector";
import { useSelector } from "react-redux";
import { Table, Thead, Th, Tbody, Tr, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const TrackShipment = () => {
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTrack = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await apiConnector(
        "GET",
        `http://13.50.14.42:8100/api/v1/trackingorder?orderId=${trackingNumber}`,
        null,
        headers
      );

      if (response.data.success) {
        setTrackingResult(response.data.data);
        setError(null);
      } else {
        setTrackingResult(null);
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error tracking order:", err);
      setError("Failed to track order");
      setTrackingResult(null);
    }
  };

  return (
    <div>
      <div className=" flex flex-col my-7 w-full justify-center items-center mx-auto">
        <h2 className="text-[50px]">TRACK & TRACE</h2>
        <div className="p-3 w-full md:w-1/2 flex items-center">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter your tracking number"
            className="border my-7 p-3 w-full"
          />
          <button
            className="px-12 text-white h-[50px] bg-[#d40511] rounded-none hover:bg-[#d40511]"
            onClick={handleTrack}
          >
            Track
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {trackingResult && (
          <p className="text-xl font-semibold">Order Details </p>
        )}
        {trackingResult && (
          <div className="my-8 flex flex-col gap-2 border w-full md:w-10/12">
            <h3 className="text-lg font-semibold text-center mt-4"></h3>
            <Table className=" mt-7 mx-auto flex flex-col border-none">
              <Thead className="bg-white border-none">
                <Tr className="flex items-center rounded-t-md border-b border-[#DDDDDD]  justify-between p-3">
                  <Th className="text-left text-lg font-medium uppercase text-richblack-600 border-none">
                    Customer ID
                  </Th>
                  <Th className="text-left text-lg font-medium uppercase text-richblack-600 border-none">
                    Order Status
                  </Th>
                  <Th className="text-left text-lg font-medium uppercase text-richblack-600 border-none">
                    Order Amount
                  </Th>
                  <Th className=" text-left text-lg font-medium uppercase text-richblack-600 border-none">
                    Payment Method
                  </Th>
                  <Th className=" text-left text-lg font-medium uppercase text-richblack-600 border-none">
                    Created At
                  </Th>
                </Tr>
              </Thead>

              <Tbody className="flex flex-col justify-center">
                <Tr className="flex items-center  bg-white border-[#DDDDDD]  justify-between p-5">
                  <Td className="text-lg font-medium text-richblack-600  border-none text-center relative md:right-5">
                    {trackingResult.customerId}
                  </Td>
                  <Td className="text-lg font-medium text-richblack-600  border-none text-center relative md:right-20">
                    {trackingResult.orderStatus}
                  </Td>
                  <Td className="text-lg font-medium text-richblack-600  border-none relative">
                    {trackingResult.orderAmount}&#x20B9;
                  </Td>
                  <Td className="text-lg font-medium text-richblack-600  border-none relative md:left-10">
                    {trackingResult.paymentMethod}
                  </Td>
                  <Td className="text-lg font-medium text-richblack-600  border-none relative">
                    {new Date(trackingResult.createdAt).toLocaleString()}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackShipment;
