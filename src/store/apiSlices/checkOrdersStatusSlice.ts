import rootApiSlice from '../root.api.slice';
const checkOrderStatusSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkOrdersStatus: builder.query({
      query: ({ id, token }) => ({
        url: `/orders/order?userId=${id}`,
        // method: 'GET',
        headers: {
          Authorization: `Bearer ${token}+d`,
        },
      }),

      keepUnusedDataFor: 2,
    }),
  }),
});

export const { useLazyCheckOrdersStatusQuery } = checkOrderStatusSlice;
