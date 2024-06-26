import {createSlice} from "@reduxjs/toolkit";

const scrollSlice = createSlice({
  name: "scroll",
  initialState: {
    scrollToComponentContact:false
  },
  reducers: {
    setScrollToComponentContact: (state, action) => {
      state.scrollToComponentContact = action.payload;
    },
  },
});

export const { setScrollToComponentContact } =scrollSlice.actions;
export default scrollSlice.reducer;