import rootApiSlice from '../root.api.slice';

const checkPaymentSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkPayment: builder.mutation({
      query: ({ id, token }) => ({
        url: `/orders/checkpayment/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useCheckPaymentMutation } = checkPaymentSlice;
