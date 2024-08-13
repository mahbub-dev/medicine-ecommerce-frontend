import baseQueryWithReauth from "@/utils/apiRequest";
import { createApi } from "@reduxjs/toolkit/query/react";

export const variantApi = createApi({
	reducerPath: "variantApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Product"], // Make sure to use the same tag type as in productApi
	endpoints: (builder) => ({
		createVariant: builder.mutation({
			query: (data) => ({
				url: `/variants`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: (result, error, { productId }) => [
				{ type: "Product", id: productId },
			], // Invalidate the product tag to update the product query
		}),
		
		updateVariant: builder.mutation({
			query: ({ productId, variantId, ...variant }) => ({
				url: `/variants/${variantId}`,
				method: "PUT",
				body: variant,
			}),
			invalidatesTags: (result, error, { productId }) => [
				{ type: "Product", id: productId },
			], // Invalidate the product tag to update the product query
		}),
		
		deleteVariant: builder.mutation({
			query: ({ productId, variantId }) => ({
				url: `/variants/${variantId}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, { productId }) => [
				{ type: "Product", id: productId },
			], // Invalidate the product tag to update the product query
		}),
	}),
});

export const {
	useCreateVariantMutation,
	useUpdateVariantMutation,
	useDeleteVariantMutation,
} = variantApi;
