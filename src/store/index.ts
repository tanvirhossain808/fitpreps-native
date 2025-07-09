import { configureStore } from '@reduxjs/toolkit';
import rootApiSlice from './root.api.slice';
import filterSlice from './slices/filterSlice';

const store = configureStore({
  reducer: {
    [rootApiSlice.reducerPath]: rootApiSlice.reducer,
    filter: filterSlice,
  },
  middleware: (preMiddleware) => preMiddleware().concat(rootApiSlice.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
