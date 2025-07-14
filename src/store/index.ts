// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import rootApiSlice from './root.api.slice';
import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import userSlice from './auth/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  [rootApiSlice.reducerPath]: rootApiSlice.reducer,
  filter: filterSlice,
  user: userSlice,
  cart: cartSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(rootApiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
