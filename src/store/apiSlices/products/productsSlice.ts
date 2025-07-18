import { SubscribedProduct } from '~/src/types/type';
import rootApiSlice from '../../root.api.slice';

const productSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      transformResponse: (response) => {
        const nonSubscribedProducts = response;
        const subscribedProducts = response
          .filter((p: SubscribedProduct) => !p.categories.includes('Pakket Samenstellen'))
          .map((p: SubscribedProduct) => ({
            ...p,
            metadata: {
              ...p.metadata,
              coin: parseInt(p.metadata._price) * 10,
            },
          }));
        return {
          nonSubscribedProducts,
          subscribedProducts,
        };
      },
    }),
  }),
});
export const { useGetProductsQuery } = productSlice;
