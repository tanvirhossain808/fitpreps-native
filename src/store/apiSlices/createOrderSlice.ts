import rootApiSlice from '../root.api.slice';

const createOrderSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ body, token }) => ({
        url: '/orders/create',
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = createOrderSlice;
