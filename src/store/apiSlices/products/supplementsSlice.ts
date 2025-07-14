import rootApiSlice from '../../root.api.slice';

const supplementsSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupplements: builder.query({
      query: () => '/supplements',
    }),
  }),
});
export const { useGetSupplementsQuery } = supplementsSlice;
