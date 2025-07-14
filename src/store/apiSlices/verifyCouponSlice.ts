import rootApiSlice from '../root.api.slice';

const verifyCoupon = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyCoupon: builder.mutation({
      query: ({
        couponCode,
        userId,
        token,
      }: {
        couponCode: string;
        userId: string;
        token: string;
      }) => ({
        url: `/coupons/validate/${couponCode}?userId=${userId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useVerifyCouponMutation } = verifyCoupon;
