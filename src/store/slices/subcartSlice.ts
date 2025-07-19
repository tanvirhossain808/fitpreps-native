import { createSlice } from '@reduxjs/toolkit';
import { Coupon, Productsmakelijke } from '~/src/types/type';
interface CartState {
  subCartItems: { [key: string]: Productsmakelijke & { quantity: number } };
  couponCode: Coupon | null;
  discount: number;
  quantity: number;
  shipping: number;
  total: number;
  subTotal: number;
  tax: number;
  orderData: any;
}
const initialState: CartState = {
  subCartItems: {},
  couponCode: null,
  discount: 0,
  shipping: 0,
  total: 0,
  subTotal: 0,
  quantity: 0,
  tax: 0,
  orderData: {},
};

const subCartSlice = createSlice({
  name: 'subCart',
  initialState,
  reducers: {
    subIncrement: (state, action) => {
      const id = action.payload._id;
      if (state.subCartItems[id]) {
        state.subCartItems[id].quantity += 1;
        state.quantity += 1;
      } else {
        state.subCartItems[id] = { ...action.payload, quantity: 1 };
        state.quantity += 1;
      }
    },
    subDecrement: (state, action) => {
      const id = action.payload._id;
      if (state.subCartItems[id]) {
        if (state.subCartItems[id].quantity > 1) {
          state.subCartItems[id].quantity -= 1;
          state.quantity -= 1;
        } else {
          state.quantity -= state.subCartItems[id].quantity;
          delete state.subCartItems[id];
        }
      }
    },
    subRemoveItem: (state, action) => {},
    SubEmptyCart: (state) => {
      state.subCartItems = {};
    },
  },
});

export default subCartSlice.reducer;
export const { subIncrement, subDecrement, subRemoveItem, SubEmptyCart } = subCartSlice.actions;
