import { Productsmakelijke } from '~/src/types/type';
import rootApiSlice from '../../root.api.slice';

const smakelijkeSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSmakelijkeProducts: builder.query<
      {
        nonSubscribedProducts: Productsmakelijke[];
        subscribedProducts: Productsmakelijke[];
      },
      null
    >({
      query: () => {
        return {
          url: `/products`,
          method: 'GET',
          params: {
            category: 'Smakelijke',
          },
        };
      },
      transformResponse: (
        response: Productsmakelijke[]
      ): {
        nonSubscribedProducts: Productsmakelijke[];
        subscribedProducts: Productsmakelijke[];
      } => {
        const nonSubscribedProducts = response;
        const subscribedProducts = response.map((product: Productsmakelijke) => {
          return {
            ...product,
            metadata: {
              ...product.metadata,
              weight_options: product.metadata.weight_options?.map((o) => ({
                ...o,
                coin: parseInt(o.price) * 10,
              })),
            },
          };
        });
        return { nonSubscribedProducts, subscribedProducts };
      },
    }),
  }),
});
export const { useGetSmakelijkeProductsQuery } = smakelijkeSlice;
