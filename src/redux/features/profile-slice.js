import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fname: "",
  lname: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
};

export const profile = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    updateProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateProfile } = profile.actions;
export default profile.reducer;
