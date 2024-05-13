import React from "react";

export default function SendMoneyBifurcation({ setformStep, documentProof }) {
  return (
    <div>
      <div className="text-[18px]">Total Charges Bifurcation</div>
      <div className="bg-[#e7e7e7] mt-5 p-5">
        <table className="text-[12px]">
          <tbody>
            <tr>
              <td>
                Exchange Rate
                <div className="font-bold">100</div>
              </td>
              <td>
                Transfer Amount in FCY
                <div className="font-bold">100</div>
              </td>
              <td>
                Total Funding Amount in INR
                <div className="font-bold">&nbsp;</div>
              </td>
            </tr>
            <tr>
              <td>
                Remittance Service Charge
                <div className="font-bold">1000 ₹</div>
              </td>
              <td>
                GST on Charge
                <div className="font-bold">100</div>
              </td>
              <td>
                GST on Currency Conversion
                <div className="font-bold">&nbsp;</div>
              </td>
            </tr>
            <tr>
              <td>
                TCS
                <div className="font-bold">100</div>
              </td>
              <td>
                TCS Flag
                <div className="font-bold">100</div>
              </td>
              <td>
                Total of all Charges and Taxes
                <div className="font-bold">&nbsp;</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="w-full">
          <button
            type="submit"
            className="w-[100%] mt-[30px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}