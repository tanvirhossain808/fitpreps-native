import rootApiSlice from '../root.api.slice';

const SubPurchaseSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subPurchase: builder.mutation({
      query: ({ body, token }: { body: any; token: string }) => ({
        url: `/subscription/purchase-points`,
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useSubPurchaseMutation } = SubPurchaseSlice;
