import rootApiSlice from '../root.api.slice';

const subProductOrderSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subProductOrder: builder.mutation({
      query: ({ body, token }) => ({
        url: '/subscription/start-subscription',
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useSubProductOrderMutation } = subProductOrderSlice;
