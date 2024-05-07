import {createSlice} from "@reduxjs/toolkit";

const scrollSlice = createSlice({
  name: "scroll",
  initialState: {
    scrollToComponentSend: false,
    scrollToComponentContact:false
  },
  reducers: {
    setScrollToComponentSend: (state, action) => {
      state.scrollToComponentSend = action.payload;
    },
    setScrollToComponentContact: (state, action) => {
      state.scrollToComponentContact = action.payload;
    },
  },
});

export const { setScrollToComponentSend, setScrollToComponentContact } =
  scrollSlice.actions;
export default scrollSlice.reducer;