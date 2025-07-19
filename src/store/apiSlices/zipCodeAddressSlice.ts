import rootApiSlice from '../root.api.slice';

const addressInfo = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddressInfo: builder.mutation({
      query: ({ postcode, website = 'fitpreps.nl' }: { postcode: string; website?: string }) => ({
        url: `/orders/address-info`,
        method: 'GET',
        params: {
          postcode,
          website,
        },
      }),
    }),
  }),
});

export const { useGetAddressInfoMutation } = addressInfo;
