import { Productsmakelijke } from '~/src/types/type';
import rootApiSlice from '../../root.api.slice';

const smakelijkeSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSmakelijkeProducts: builder.query<Productsmakelijke[], null>({
      query: () => {
        return {
          url: `/products`,
          method: 'GET',
          params: {
            category: 'Smakelijke',
          },
        };
      },
    }),
  }),
});
export const { useGetSmakelijkeProductsQuery } = smakelijkeSlice;
