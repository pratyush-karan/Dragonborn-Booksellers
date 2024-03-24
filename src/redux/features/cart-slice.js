import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: 0,
  itemList: [],
};
export const cart = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      return {
        ...state,
        totalItems: state.totalItems + 1,
        itemList: [...state.itemList, newItem],
      };
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.itemList.findIndex((item) => item.id === itemId);
      const itemToUpdate = state.itemList[itemIndex];
      const updatedItemList = [...state.itemList];

      if (itemToUpdate.qty === 1) {
        updatedItemList.splice(itemIndex, 1);
      } else {
        updatedItemList[itemIndex] = {
          ...itemToUpdate,
          qty: itemToUpdate.qty - 1,
        };
      }
      return {
        ...state,
        totalItems: state.totalItems - 1,
        itemList: updatedItemList,
      };
    },

    removeItemsFromCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.itemList.findIndex((item) => item.id === itemId);
      const updatedItemList = [...state.itemList];
      const deleteQty = updatedItemList[itemIndex].qty;
      updatedItemList.splice(itemIndex, 1);

      return {
        ...state,
        totalItems: state.totalItems - deleteQty,
        itemList: updatedItemList,
      };
    },
  },
});

export const { addItemToCart, removeItemFromCart, removeItemsFromCart } =
  cart.actions;
export default cart.reducer;
