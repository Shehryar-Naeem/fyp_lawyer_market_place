import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/user/`,
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "login-or-register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useSignupMutation } = userApi;
