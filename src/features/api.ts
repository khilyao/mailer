import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = import.meta.env.VITE_API_URL;

export const RTKAPI = createApi({
  reducerPath: "api",
  tagTypes: ["profile", "emails"],
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Basic ZGV2X3Rlc3QxOmZldHZ4V21H`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
