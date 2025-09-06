import rootApiSlice from '../../root.api.slice';

const gymwearSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGymwear: builder.query({
      query: () => '/gymwear',
    }),
    getGymwearById: builder.query({
      query: (id: string) => `/gymwear/single/${id}`,
    }),
    getGymwearBySlug: builder.query({
      query: (slug: string) => `/gymwear/${slug}`,
    }),
  }),
});

export const { 
  useGetGymwearQuery, 
  useGetGymwearByIdQuery, 
  useGetGymwearBySlugQuery 
} = gymwearSlice;
