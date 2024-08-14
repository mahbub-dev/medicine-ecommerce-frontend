import { IProduct } from "@/components/admin/products/types";
import baseQueryWithReauth from "@/utils/apiRequest";
import { createApi } from "@reduxjs/toolkit/query/react";

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
				totalPages: number;
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
		getProductByCategory: builder.query<
			{
				products: IProduct[];
				total: number;
				totalPages: number;
				limit: number;
			},
			{ page?: number; limit?: number; categories: string[] }
		>({
			query: ({ categories, page = 1, limit = 10 }) => ({
				url: `/products/by-category/`,
				params: { page, limit, categories },
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
		updateProduct: builder.mutation<
			IProduct,
			{ _id: string; data: Partial<IProduct> }
		>({
			query: ({ _id, data }) => ({
				url: `/products/${_id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: (result, error, { _id }) => [
				{ type: "Product", id: _id },
				{ type: "Product", id: "LIST" },
			],
		}),

		// Mutation for deleting a product with optimistic update
		deleteProduct: builder.mutation<{ success: boolean }, string>({
			query: (id) => ({
				url: `/products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Product", id: "LIST" }],
			async onQueryStarted(id, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					productApi.util.updateQueryData(
						"getProducts",
						{ page: 1, limit: 10 },
						(draft) => {
							draft.products = draft.products.filter(
								(product) => product._id !== id
							);
						}
					)
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
		}),
	}),
});

export const {
	useCreateProductMutation,
	useGetProductsQuery,
	useGetProductByIdQuery,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useGetProductByCategoryQuery
} = productApi;
