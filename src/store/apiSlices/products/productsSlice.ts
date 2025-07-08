import rootApiSlice from '../../root.api.slice';

const productSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
  }),
});
export const { useGetProductsQuery } = productSlice;
