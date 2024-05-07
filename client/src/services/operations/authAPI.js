import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../utils/authSlice";
import { apiConnector } from "./apiconnector";
import { bookOrderEndpoints, endpoints } from "../apis";
import { setUser } from "../../utils/profileSlice";

const { SIGNUP_API, LOGIN_API } = endpoints;

const { CREATE_ORDER } = bookOrderEndpoints;


export const sendSignUp = (
  username,
  firstName,
  lastName,
  email,
  phoneNo,
  password,
  navigate
) => {
  console.log(username, firstName);
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        username,
        firstName,
        lastName,
        email,
        phoneNo,
        password,
      });

      console.log("SIGNUP API RESPONSE...........", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup successful");
      navigate("/login");
      toast.dismiss(toastId);
    } catch (err) {
      toast.error("Error while signup");
      navigate("/signup");
      toast.dismiss(toastId);
    }
    dispatch(setLoading(false));
  };
};

export const setLogin = (email, password, navigate, loginFromCheckout) => {
  console.log("loginFromCheckout", loginFromCheckout);
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(false));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response?.data?.token));

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.username}`;

      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response?.data?.token));
      localStorage.setItem("user", JSON.stringify(response?.data?.user));

      !loginFromCheckout?navigate("/"):navigate('/checkout');
    } catch (err) {
      console.log("LOGIN API ERROR............", err);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const logout=(navigate)=>{
  return (dispatch)=>{
     dispatch(setLoading(false));
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token");
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/");
  }
}

export const setConvert=(totalEntries)=>{
  const destructeredArray=totalEntries?.map(({amount,from,to,currentRate})=>({amount,from,to,currentRate}))
  return async(dispatch)=>{
    const toastId=toast.loading("Loading...");
    dispatch(setLoading(true))
    try{
      const response = await apiConnector("POST", CREATE_ORDER, {
        currencyData: destructeredArray,
      });

      if(!response.data.success){
        throw new Error(response?.data?.message)
      }

      toast.success("Order Placed")
    }catch(err){
      console.log("Conversion ERROR..........",err);
      toast.error("Error while book this order")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


