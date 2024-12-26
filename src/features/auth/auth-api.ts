import { RTKAPI } from "../api.ts";

export const authApi = RTKAPI.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/users/",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["profile"],
    }),
    currentUser: builder.query({
      query: () => `/users/current/`,
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useCurrentUserQuery } = authApi;
