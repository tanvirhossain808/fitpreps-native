import { createSlice } from '@reduxjs/toolkit';
import { Productsmakelijke } from '~/src/types/type';

interface CartState {
  cartItems: { [key: string]: Productsmakelijke & { quantity: number } };
  coupon: string | null;
  couponCode: string | null;
  discount: number;
  shipping: number;
  total: number;
  subTotal: number;
  tax: number;
}

const initialState: CartState = {
  cartItems: {},
  coupon: null,
  couponCode: null,
  discount: 0,
  shipping: 0,
  total: 0,
  subTotal: 0,
  tax: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action) => {
      const id = action.payload._id;
      if (state.cartItems[id]) {
        state.cartItems[id].quantity += 1;
      } else {
        state.cartItems[id] = { ...action.payload, quantity: 1 };
      }
    },
    decrement: (state, action) => {
      const id = action.payload._id;
      if (state.cartItems[id]) {
        if (state.cartItems[id].quantity > 1) {
          state.cartItems[id].quantity -= 1;
        } else {
          delete state.cartItems[id];
        }
      }
    },
    removeItem: (state, action) => {
      const id = action.payload._id;
      delete state.cartItems[id];
    },
    emptyCart: (state) => {
      state.cartItems = {};
    },
    setCoupon: (state, action) => {
      state.couponCode = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setSubTotal: (state, action) => {
      state.subTotal = action.payload;
    },
    setTax: (state, action) => {
      state.tax = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const {
  increment,
  decrement,
  removeItem,
  emptyCart,
  setCoupon,
  setDiscount,
  setSubTotal,
  setShipping,
  setTotal,
} = cartSlice.actions;
