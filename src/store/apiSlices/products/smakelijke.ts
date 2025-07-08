import { Productsmakelijke, SliderItem } from '~/src/types/type';
import rootApiSlice from '../../root.api.slice';
import { productRows } from '~/src/helper';
import { sliderData } from '~/src/constant';

const smakelijkeSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSmakelijkeProducts: builder.query<(Productsmakelijke | SliderItem)[][], null>({
      query: () => {
        return {
          url: '/products',
          method: 'GET',
          params: {
            category: 'Smakelijke',
          },
        };
      },
      transformResponse: (response: Productsmakelijke[]) => {
        return productRows(response);
      },
    }),
  }),
});
export const { useGetSmakelijkeProductsQuery } = smakelijkeSlice;
