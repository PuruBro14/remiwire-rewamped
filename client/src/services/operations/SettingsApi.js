import {toast} from 'react-hot-toast'
import { apiConnector } from './apiconnector'
import { settingsEndPoints } from "../apis";
import { logout } from "./authAPI";
import { setUser } from '../../utils/profileSlice';

const {
  UPDATE_PROFILE_API,
  FETCH_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
  CREATE_ADDRESS_API,
  GET_ADDRESS_API,
  DELETE_ADDRESS_API,
} = settingsEndPoints;

export function updateProfile(token, formData, navigate, user) {
  console.log("token", token, "formData", formData);
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log("response", response);

      const updatedUser = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        additionalDetails: {
          ...user.additionalDetails,
          ...response.data.profile,
        },
      };

      console.log("Updated user:", updatedUser);

      dispatch(setUser(updatedUser));

      toast.success("Profile Updated Successfully");
      navigate("/userprofile/my-profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Could not update profile");
    }
    toast.dismiss(toastId);
  };
}

export const fetchUserProfile = (token) => async (dispatch) => {
  const result=[]
  try {
    const response = await apiConnector("GET", FETCH_PROFILE_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    dispatch(setUser(response.data.profile));
  } catch (err) {
    console.error("Error fetching profile:", err);
  }
};


export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Password changed successfully");
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Could not change password";
    toast.error(errorMessage);
  } finally {
    toast.dismiss(toastId);
  }
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}

export async function createAddress(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_ADDRESS_API, formData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Address created successfully");
  } catch (err) {
    toast.error(err.response.data.message);
  }
  toast.dismiss(toastId);
}

export const fetchDeliveryAddress = async (token, dispatch,user, setUser) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", GET_ADDRESS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("Delivery Address API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch delivery address");
    }

    console.log('response?.data',response?.data?.data,user);
    result = response?.data?.data;
    dispatch(setUser({ ...user, address: response?.data?.data }));
  } catch (error) {
    console.log("Delivery Address API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};


export const deleteExistingAddress = async (data, token) => {
  console.log("data", data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_ADDRESS_API}/${data?.addressId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Could Not Delete address");
    }
    toast.success("Address Deleted");
  } catch (error) {
    console.log("DELETE ADDRESS API ERROR............", error);
    toast.error(error.message);
  } finally {
    toast.dismiss(toastId);
  }
};
