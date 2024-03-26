import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lawyerApi = createApi({
  reducerPath: "lawyerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/lawyer/`,
  }),
  tagTypes: ["Lawyers"],
  endpoints: (builder) => ({
    createLawyer: builder.mutation({
      query: (lawyer) => ({
        url: "/create-lawyer-account",
        method: "POST",
        body: lawyer,
      }),
      invalidatesTags: ["Lawyers"],
    }),
  }),
});

export const { useCreateLawyerMutation } = lawyerApi;
