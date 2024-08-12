import baseQueryWithReauth from "@/utils/apiRequest";
import { createApi } from "@reduxjs/toolkit/query/react";

import { IProduct } from "@/components/admin/products/types";

// Define the API
export const productApi = createApi({
	reducerPath: "productApi",
	baseQuery: baseQueryWithReauth, // Adjust the base URL as needed
	tagTypes: ["Product"], // Define tag for invalidation
	endpoints: (builder) => ({
		// Mutation for creating a product
		createProduct: builder.mutation<IProduct, FormData>({
			query: (newProduct) => ({
				url: "/products", // The endpoint in your backend
				method: "POST",
				body: newProduct,
			}),
			invalidatesTags: [{ type: "Product", id: "LIST" }],
		}),
		// Query for getting products with pagination
		getProducts: builder.query<
			{
				products: IProduct[];
				total: number;
				page: number;
				limit: number;
			},
			{ page?: number; limit?: number }
		>({
			query: ({ page = 1, limit = 10 }) => ({
				url: `/products`,
				params: { page, limit },
			}),
			providesTags: (result) =>
				result
					? [
							...result.products.map(({ _id }) => ({
								type: "Product" as const,
								id: _id,
							})),
							{ type: "Product", id: "LIST" },
					  ]
					: [{ type: "Product", id: "LIST" }],
		}),
		// Query for getting a single product by ID
		getProductById: builder.query<IProduct, string>({
			query: (id) => ({
				url: `/products/${id}`,
			}),
			providesTags: (result, error, id) => [{ type: "Product", id }],
		}),
		// Mutation for updating a product
		updateProduct: builder.mutation<IProduct, Partial<IProduct>>({
			query: ({ _id, ...rest }) => ({
				url: `/products/${_id}`,
				method: "PUT",
				body: rest,
			}),
			invalidatesTags: (result, error, { _id }) => [
				{ type: "Product", id: _id },
				{ type: "Product", id: "LIST" },
			],
		}),
		// Mutation for deleting a product
		deleteProduct: builder.mutation<{ success: boolean }, string>({
			query: (id) => ({
				url: `/products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Product", id: "LIST" }],
		}),
	}),
});

export const {
	useCreateProductMutation,
	useGetProductsQuery,
	useGetProductByIdQuery,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productApi;
