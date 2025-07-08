import { configureStore } from '@reduxjs/toolkit';
import rootApiSlice from './root.api.slice';

const store = configureStore({
  reducer: {
    [rootApiSlice.reducerPath]: rootApiSlice.reducer,
  },
  middleware: (preMiddleware) => preMiddleware().concat(rootApiSlice.middleware),
});

export default store;
