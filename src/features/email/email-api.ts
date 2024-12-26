import { RTKAPI } from "../api.ts";

export const emailApi = RTKAPI.injectEndpoints({
  endpoints: (builder) => ({
    sendEmail: builder.mutation({
      query: (emailData) => ({
        url: "/emails/",
        method: "POST",
        body: emailData,
      }),
      invalidatesTags: ["emails"],
    }),
    ownEmails: builder.query({
      query: (offset) => `/emails/?offset=${offset}`,
      providesTags: ["emails"],
    }),
  }),
  overrideExisting: false,
});

export const { useSendEmailMutation, useOwnEmailsQuery } = emailApi;
