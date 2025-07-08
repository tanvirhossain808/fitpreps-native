import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../constants/baseConstant';

const rootApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + '/api',
  }),
  endpoints: (builder) => ({}),
});
export default rootApiSlice;

// export const { useGetProductsQuery } = rootSlice;
