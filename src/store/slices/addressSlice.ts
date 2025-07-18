import { createSlice, nanoid } from '@reduxjs/toolkit';
import { AddressType } from '~/src/types/type';

const addressSlice = createSlice({
  name: 'address',
  initialState: [] as AddressType[],
  reducers: {
    addAddress: (state, action) => {
      action.payload._id = nanoid();
      state.push(action.payload);
    },
    removeAddress: (state, action) => {
      state = state.filter((address) => address._id !== action.payload);
    },
    updateAddress: (state, action) => {
      const index = state.findIndex((address) => address._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    clearAddress: (state) => {
      state = [];
    },
  },
});

export const { addAddress, removeAddress, updateAddress, clearAddress } = addressSlice.actions;
export default addressSlice.reducer;
