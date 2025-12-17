import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to cart
    addItemCart: (state, actions) => {
      const item = actions.payload;
      const existing = state.find((i) => i.id === item?.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.push({ ...item, qty: 1 });
      }
    },

    // decrement cart
    decrementCart: (state, actions) => {
      const item = actions.payload;
      const existing = state.find((i) => i.id === item?.id);

      if (existing?.qty > 0) {
        existing.qty -= 1;
      } else {
        return state.filter((i) => i.id !== item?.id);
      }
    },

    // clear item
    clearItemCart: (state, actions) => {
      const item = actions.payload;
      return state.filter((i) => i.id !== item?.id);
    },

    // clear all
    clearAllCart: () => initialState,
  },
});

export const { addItemCart, decrementCart, clearItemCart, clearAllCart } =
  cartSlice.actions;
export default cartSlice.reducer;
