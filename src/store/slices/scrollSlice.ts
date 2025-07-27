import { createSlice } from '@reduxjs/toolkit';

const scrollSlice = createSlice({
  name: 'scroll',
  initialState: false,
  reducers: {
    onScrollTop: () => true,
    onScrollBottom: () => false,
  },
});

export default scrollSlice.reducer;
export const { onScrollTop, onScrollBottom } = scrollSlice.actions;
