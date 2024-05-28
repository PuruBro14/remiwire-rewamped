import {createSlice} from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        signUpData:null,
        loading:false,
        redirectedFromRoute:false,
        token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null
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
        }
    }
})

export const { setSignUpData, setLoading, setRedirectedFromRoute,setToken } =
  authSlice.actions;
export default authSlice.reducer;