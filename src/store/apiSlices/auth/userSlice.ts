import { LoginBody, RegisterBody } from '~/src/types/type';
import rootApiSlice from '../../root.api.slice';

const userApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body: RegisterBody) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body: LoginBody) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = userApiSlice;
