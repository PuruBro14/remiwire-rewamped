import React, { useEffect } from "react";
import Terms from "./assets/img/terms.jpg";
import './TermsOfUse.css'
export default function TermsOfUse() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="terms-of-use-container container mx-auto px-4">
        <h2 className="text-center my-4 text-3xl mt-10 mb-10 font-bold">
          Terms And Conditions
        </h2>

        <div className="flex flex-row gap-2">

        <div className="gap-4 mt-5 w-[60%]">
          
          <div className="p-4 terms-text">

            <ul>
              <li>
                 Acceptance of Terms: By accessing or using the Remiwire Forex Services web portal, you accept and agree to be bound by their terms and conditions.
              </li>

              <li>
                 Use of Services: The web portal is for personal, non-commercial use. You must not use the services for any unlawful or prohibited purposes.

              </li>

              <li>
                 Intellectual Property: All content on the web portal, including intellectual property rights, belongs to Remiwire Forex Services or its licensors.

              </li>

              <li>
                 Booking Policy: Remiwire Forex Services reserves the right to reject or cancel any booking or service order. You must ensure that the foreign exchange released is used within 60 days of purchase.

              </li>

              <li>
                 Cancellation Charges: If you cancel a booking or service order, you'll be liable to pay a cancellation charge of 2% of the transaction amount plus applicable taxes, or Rs. 1000 plus applicable taxes, whichever is higher.
                 Refund Policy: Refunds will be processed within 8-10 business days from the date of cancellation. However, applicable cancellation charges will be deducted from the refund amount.
              </li>

              <li>
                 No Warranties: Remiwire Forex Services provides the web portal and services on an "as-is" and "where-is" basis, without any express or implied warranties.
              </li>

              <li>

                 Limitation of Liability: Remiwire Forex Services is not liable for any damages, losses, or expenses arising from the use of their services.

              </li>

            </ul>
          </div>

        </div>
        <div className="p-4 w-[40%]">
          <img src={Terms} alt="Terms Of Use"/>
        </div>
      </div>

      </div>

    </>
  );
}
