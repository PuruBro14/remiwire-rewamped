const BASE_URL="http://localhost:8100/api/v1"

export const endpoints={
    SIGNUP_API:BASE_URL+"/auth/signup",
    LOGIN_API:BASE_URL+"/auth/login"
}

export const bookOrderEndpoints = {
  CREATE_ORDER: BASE_URL + "/createOrder",
  GET_ORDERS: BASE_URL + "/fetchAllBookOrders",
  DELETE_ORDERS:BASE_URL+"/deleteOrderById"
};

export const contactUsEndPoint={
  CONTACT_US_API:BASE_URL+"/contact-us"
}

export const settingsEndPoints = {
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/profile/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  CREATE_ADDRESS_API: BASE_URL + "/address/createAddress",
  GET_ADDRESS_API: BASE_URL + "/address/fetchAllAddress",
  DELETE_ADDRESS_API: BASE_URL + "/address/deleteAddress",
};