import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const order = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    addOrderDetails: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { addOrderDetails } = order.actions;
export default order.reducer;

// {
//     orderId: "",
//     orderDate: "",
//     ProductList: [],
//     TotalPrice: "",
//   };

// {
//     ProductName: "",
//     Qty:"",
//     Price:""
// }
