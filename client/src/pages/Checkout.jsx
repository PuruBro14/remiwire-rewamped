import React, { useEffect, useState } from "react";
import LoginCheckout from "../components/Checkout/LoginCheckout";
import OrderSummary from "../components/Checkout/OrderSummary";
import PaymentOptions from "../components/Checkout/PaymentOptions";
import { Link } from "react-router-dom";
import ManageDeliveryAddress from "../components/core/ManageDeliveryAddress";
import { fetchDeliveryAddress } from "../services/operations/SettingsApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../utils/profileSlice";

const Checkout = () => {
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getDeliveryAddress = async () => {
    setLoading(true);
    const result = await fetchDeliveryAddress(token, dispatch, user, setUser);
    if (result) {
      setDeliveryAddress(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDeliveryAddress();
  }, []);

  return (
    <div>
      <div className="w-11/12 mx-auto max-w-[900px]">
        <div className="flex flex-col gap-5 py-16 pb-48 ">
          <div>
            <LoginCheckout />

            <ManageDeliveryAddress />

            <OrderSummary />

            <PaymentOptions />
          </div>

          <hr className="text-[#DDDDDD]" />

          <div className="w-11/12 mx-auto flex flex-row justify-between text-richblack-900">
            <div className=" flex flex-row justify-between w-full">
              <div>
                <ul className="flex flex-row gap-x-2">
                  <li className="text-richblack-900">Policies:</li>
                  <li className="text-richblack-900">Return Policy | </li>
                  <li className="text-richblack-900">Security </li>
                </ul>
              </div>
              <div className="flex flex-row text-richblack-900 mr-10">
                2020-2024 Remiwire.com
              </div>
            </div>

            <Link to="/">
              <p className="text-richblack-900 tracking-wide">
                Need help?Visit the help center or Contact Us
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
