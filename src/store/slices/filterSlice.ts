// store/slices/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  category?: string;
  sortBy: 'price_asc' | 'price_desc' | 'oldest' | 'recent' | string;
  gender?: 'male' | 'female' | null;
  filters: {
    [key: string]: string[] | undefined;
    price?: ('€0 - €10' | '€10 - €20' | '€20 - €50' | '€50 - €100' | '€100+')[];
  };
}

const initialState: FilterState = {
  sortBy: '',
  gender: null,
  filters: {},
  category: 'Alle',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | undefined>) => {
      state.category = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FilterState['sortBy']>) => {
      console.log(action.payload, 'action');
      state.sortBy = action.payload;
    },
    setGender: (state, action: PayloadAction<'male' | 'female' | null>) => {
      state.gender = action.payload;
    },
    setFilter: (state, action: PayloadAction<{ [key: string]: string[] }>) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      return {
        ...state,
        ...initialState,
        sortBy: state.sortBy,
        filters: {},
        category: state.category,
      };
    },
    resetAllFilters: (state) => {
      return {
        ...initialState,
        category: 'Alle',
      };
    },
  },
});

export const { setCategory, setSortBy, setFilter, setGender, resetFilters, resetAllFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
