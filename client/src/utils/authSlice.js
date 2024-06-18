import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    signUpData: null,
    adminToken: localStorage.getItem("adminToken")
      ? JSON.parse(localStorage.getItem("adminToken"))
      : null,
    loading: false,
    redirectedFromRoute: false,
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
    role: null,
  },
  reducers: {
    setSignUpData: (state, action) => {
      state.signUpData = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRedirectedFromRoute: (state, action) => {
      state.redirectedFromRoute = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const {
  setSignUpData,
  setLoading,
  setRedirectedFromRoute,
  setToken,
  setAdminToken,
  setRole
} = authSlice.actions;
export default authSlice.reducer;