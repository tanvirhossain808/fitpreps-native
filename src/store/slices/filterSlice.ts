// store/slices/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  category?: string;
  priceRange?: [number, number] | ['100+'] | null;
  sortBy: 'price_asc' | 'price_desc' | 'oldest' | 'recent' | string;
  gender?: 'male' | 'female' | null;
}

const initialState: FilterState = {
  sortBy: '',
  gender: null,
  priceRange: null,
  category: 'Alle',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | undefined>) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number] | undefined>) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FilterState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setGender: (state, action: PayloadAction<'male' | 'female' | null>) => {
      state.gender = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setCategory, setPriceRange, setSortBy, setGender, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
