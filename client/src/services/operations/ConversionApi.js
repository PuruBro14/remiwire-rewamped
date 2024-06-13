import { toast } from "react-hot-toast";
import { apiConnector } from "./apiconnector";
import { bookOrderEndpoints } from "../apis";

const { CREATE_ORDER } = bookOrderEndpoints;

export const bookOrder = (token, formData, navigate) => {
  const formData1 = {
    customerId: "CUSTOM1",
    currencyData: [
      {
        amount: 100,
        from: "USD",
        to: "EUR",
        currentRate: 0.85,
      },
      {
        amount: 200,
        from: "EUR",
        to: "GBP",
        currentRate: 0.91,
      },
    ],
  };

  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", CREATE_ORDER, formData1, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Order placed successfully");
      console.log("result", response);

      dispatch({ type: "BOOK_ORDER_SUCCESS", payload: response.data });

      navigate("/my-orders");
      localStorage.removeItem("convertEntries");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log("Error message - ", err.message);
      dispatch({ type: "BOOK_ORDER_FAILURE", payload: err.message });
    } finally {
      toast.dismiss(toastId);
    }
  };
};
