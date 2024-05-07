import {createSlice} from "@reduxjs/toolkit"

const initialState={
    step:1,
    bookCurrency:null,
    paymentLoading:false
}

const bookCurrencySlice=createSlice({
    name:"currency",
    initialState,
    reducers:{
    setStep:(state,action)=>{
        state.step=action.payload;
    },
    setBookCurrency:(state,action)=>{
        state.currency=action.payload;
    },
    setPaymentLoading:(state,action)=>{
        state.paymentLoading=action.payload;
    },
    resetCurrencyState:(state)=>{
        state.step=1;
        state.currency=null;
        state.paymentLoading=false
    }
}
})

export const { setStep, setBookCurrency, setPaymentLoading, resetCurrencyState } =
  bookCurrencySlice.actions;

export default bookCurrencySlice.reducer;