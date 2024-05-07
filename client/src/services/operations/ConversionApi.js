import { toast } from "react-hot-toast";
import { apiConnector } from "./apiconnector";
export async function bookOrder(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    // const response = await apiConnector("POST", CREATE_ADDRESS_API, formData, {
    //   Authorization: `Bearer ${token}`,
    // });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Order placed successfully");
    navigate("/my-orders")
  } catch (err) {
    toast.error(err.response.data.message);
      navigate("/my-orders");
  }
  toast.dismiss(toastId);
}
