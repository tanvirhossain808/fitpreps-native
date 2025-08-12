import { createSlice } from '@reduxjs/toolkit';
import { LoginResponse } from '~/src/types/type';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: <LoginResponse | null>null,
    isLoading: <boolean>false,
    error: <string | null>null,
    metadata: <any | null>null,
    subscription: <any | null>null,
    points: <any | null>null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
    setMetadata: (state, action) => {
      state.metadata = action.payload;
    },
  },
});

export const { setUser, setLoading, setError, clearUser, setSubscription } = userSlice.actions;
export default userSlice.reducer;
