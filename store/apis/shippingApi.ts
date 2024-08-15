import { ShippingAddress } from "@/components/shipping/types";
import baseQueryWithReauth from "@/utils/apiRequest";
import { createApi } from "@reduxjs/toolkit/query/react";

export const shippingApi = createApi({
  reducerPath: "shippingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ShippingAddress"],
  endpoints: (builder) => ({
    getShippingAddresses: builder.query<ShippingAddress[], void>({
      query: () => "/shipping-addresses",
      providesTags: [{ type: 'ShippingAddress', id: 'LIST' }], // Use LIST for the entire collection
    }),
    createShippingAddress: builder.mutation<ShippingAddress, Partial<ShippingAddress>>({
      query: (newAddress) => ({
        url: "/shipping-addresses",
        method: "POST",
        body: newAddress,
      }),
      invalidatesTags: [{ type: 'ShippingAddress', id: 'LIST' }], // Invalidate LIST tag
    }),
    updateShippingAddress: builder.mutation<ShippingAddress, { id: string; updates: Partial<ShippingAddress> }>({
      query: ({ id, updates }) => ({
        url: `/shipping-addresses/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: [{ type: 'ShippingAddress', id: 'LIST' }], // Invalidate LIST tag
    }),
    deleteShippingAddress: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/shipping-addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'ShippingAddress', id: 'LIST' }], // Invalidate LIST tag
    }),
    selectShippingAddress: builder.mutation<void, { addressId: string }>({
      query: ({ addressId }) => ({
        url: `/shipping-addresses/select`,
        method: "POST",
        body: { addressId },
      }),
      invalidatesTags: [{ type: 'ShippingAddress', id: 'LIST' }], // Invalidate LIST tag
    }),
  }),
});

export const {
  useGetShippingAddressesQuery,
  useCreateShippingAddressMutation,
  useUpdateShippingAddressMutation,
  useDeleteShippingAddressMutation, // Export the new mutation hook
  useSelectShippingAddressMutation,
} = shippingApi;
