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
      // transformResponse: (response: Productsmakelijke[], meta, arg) => {
      //   // return productRows(response);`
      //   console.log(response, 'response', meta, 'Df', arg);
      //   const category = arg.category;
      //   let data: Productsmakelijke[] = [];
      //   if (category.toLowerCase() === 'Alle'.toLowerCase()) {
      //     data = [...response];
      //   } else {
      //     const filterData = response.filter(
      //       (item) => item.categories[1].toLowerCase() === category.toLowerCase()
      //     );
      //     console.log(filterData, 'youdata');
      //     data = [...filterData];
      //   }
      //   console.log('bey');
      //   return data;
      // },
    }),
  }),
});
export const { useGetSmakelijkeProductsQuery } = smakelijkeSlice;
