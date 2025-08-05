import { createSlice } from '@reduxjs/toolkit';
import { Coupon, Productsmakelijke } from '~/src/types/type';

interface CartState {
  cartItems: { [key: string]: Productsmakelijke & { quantity: number } };
  couponCode: Coupon | null;
  discount: number;
  quantity: number;
  shipping: number;
  total: number;
  subTotal: number;
  tax: number;
  orderData: any;
  fitCouponData: any;
  shippingCountry: string;
}

const initialState: CartState = {
  cartItems: {},
  couponCode: null,
  discount: 0,
  shipping: 0,
  total: 0,
  subTotal: 0,
  quantity: 0,
  tax: 0,
  orderData: {},
  fitCouponData: null,
  shippingCountry: 'NL',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action) => {
      const id = action.payload._id;
      if (state.cartItems[id]) {
        state.cartItems[id].quantity += 1;
        state.quantity += 1;
      } else {
        state.cartItems[id] = { ...action.payload, quantity: 1 };
        state.quantity += 1;
      }
    },
    decrement: (state, action) => {
      const id = action.payload._id;
      if (state.cartItems[id]) {
        if (state.cartItems[id].quantity > 1) {
          state.cartItems[id].quantity -= 1;
          state.quantity -= 1;
        } else {
          state.quantity -= state.cartItems[id].quantity;
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
      state.quantity = 0;
      state.total = 0;
      state.subTotal = 0;
      state.tax = 0;
      state.shipping = 0;
      state.discount = 0;
      state.couponCode = null;
      state.orderData = {};
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
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setShippingCountry: (state, action) => {
      state.shippingCountry = action.payload;
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
  setOrderData,
  setTax,
  setTotal,
  setQuantity,
  setShippingCountry,
} = cartSlice.actions;
