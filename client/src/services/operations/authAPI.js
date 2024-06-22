import { toast } from "react-hot-toast";
import { setLoading, setToken, setRole, setAdminToken } from "../../utils/authSlice";
import { apiConnector } from "./apiconnector";
import { bookOrderEndpoints, endpoints } from "../apis";
import { setUser } from "../../utils/profileSlice";
import axios from "axios";

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

export const setLogin = (
  email,
  password,
  navigate,
  loginFromCheckout
) => {
  const sendMoneyLoggedIn = localStorage.getItem("sendmoneyloggedIn");
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

       if (sendMoneyLoggedIn) {
        navigate("/sendmoneyabroad");
        localStorage.removeItem("sendmoneyloggedin");
      } else {
        navigate("/");
      }
      console.log("navigated to send money abroad");
    } catch (err) {
      console.log("LOGIN API ERROR............", err);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const logout = (navigate) => {
  console.log('this called-------------<huehuehue');
  return (dispatch) => {
    dispatch(setLoading(false));
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(setRole(null))
    dispatch(setAdminToken(null))
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    localStorage.removeItem("sendmoneyloggedIn");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("role");
    navigate("/");
  };
};

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

export const sendOtp = (phoneNumber) => async (dispatch) => {
  console.log('clicked-------------->');
  const toastId = toast.loading("Loading...");
  try {
    const response = await axios.post("http://localhost:8100/api/v1/send-otp", {
      phoneNumber,
    });
    toast.success("OTP Sent Successfully");
    return response.data;
  } catch (error) {
    console.log('error--------------------->',error);
    return { success: false };
  }finally{
  toast.dismiss(toastId);
  }
};

export const verifyOtp = (phoneNumber, otp, navigate) => async (dispatch) => {
  console.log("clicked-------------->");
   const toastId = toast.loading("Loading...");
  try {
    const response = await axios.post("http://localhost:8100/api/v1/verify-otp", {
      phoneNumber,
      otp,
    });
    toast.success("OTP Verified");
    if (response.data.success) {
      dispatch(setUser(response.data.user));
      navigate("/");
      localStorage.setItem("token",1234);
        localStorage.setItem("user",JSON.stringify({"username":"purusharma001"}))
    } else {
      dispatch(setLoginError("OTP verification failed"));
    }
  } catch (error) {
  } finally {
    toast.dismiss(toastId);
  }
};

//{"username":"purusharma001"}
// {"_id":"66349af8293fa499048702cb","username":"purusharma001","firstName":"goku90","lastName":"sharma","email":"puruwv02@gmail.com","additionalDetails":{"_id":"66349af8293fa499048702c9","gender":"","dateOfBirth":"","__v":0},"image":"https://api.dicebear.com/5.x/initials/svg?seed=purusharma001","address":["666d6fd31d72ef57d0aed27d","666d703390ab7d3d14ad18e7","666d70e4bdefe5a7156f4813"],"createdAt":"2024-05-03T08:06:16.344Z","updatedAt":"2024-06-19T09:01:24.950Z","__v":3,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InB1cnV3djAyQGdtYWlsLmNvbSIsImlkIjoiNjYzNDlhZjgyOTNmYTQ5OTA0ODcwMmNiIiwiaWF0IjoxNzE4Nzg3Njg0LCJleHAiOjE3MTkwNDY4ODR9.mH502QofLvwal9rCehFn9diHdDZWRo4kVJE4v2Gzvko"}