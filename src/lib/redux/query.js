import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8000/api";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, prepareHeaders: async (headers) => {
    const clerk = window.Clerk;
    if (clerk) {
      const token = await clerk.session.getToken();
      console.log(token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  } }),
  endpoints: (build) => ({
    getEnergyGenerationRecordsBySolarUnit: build.query({
      query: ({id, groupBy, limit}) => `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
    }),
    getSolarUnitForUser: build.query({
      query: () => `/solar-units/me`,
    }),
    getSolarUnits: build.query({
      query: () => `/solar-units`,
    }),
    getSolarUnitById: build.query({
      query: (id) => `/solar-units/${id}`,
    }),
    createSolarUnit: build.mutation({
      query: (data) => ({
        url: `/solar-units`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEnergyGenerationRecordsBySolarUnitQuery, useGetSolarUnitForUserQuery, useGetSolarUnitsQuery, useGetSolarUnitByIdQuery, useCreateSolarUnitMutation } = api;
