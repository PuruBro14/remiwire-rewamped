import {createSlice} from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        signUpData:null,
        loading:false,
        redirectedFromRoute:false,
        token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
        roleValue:""
    },
    reducers:{
        setSignUpData:(state,action)=>{
            state.signUpData=action.payload;
        },

        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        setRedirectedFromRoute:(state,action)=>{
            state.redirectedFromRoute=action.payload
        },
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setRoleValue:(state,action)=>{
            state.role=action.payload
        }
    }
})

export const {
  setSignUpData,
  setLoading,
  setRedirectedFromRoute,
  setToken,
  setRoleValue,
} = authSlice.actions;
export default authSlice.reducer;