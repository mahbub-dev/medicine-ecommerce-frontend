import baseQueryWithReauth from "@/utils/apiRequest";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface ICategory {
	_id?: string;
	name: string;
	slug: string;
	thumbnail: string;
	parentCategory?: any;
	parentCategoryDetails?: ICategory;
	level: "primary" | "secondary" | "tertiary";
}

// Define the API
export const categoryApi = createApi({
	reducerPath: "categoryApi",
	baseQuery: baseQueryWithReauth, // Adjust the base URL as needed
	tagTypes: ["Category"], // Define tag for invalidation
	endpoints: (builder) => ({
		// Mutation for creating a category
		createCategory: builder.mutation<ICategory, Partial<ICategory>>({
			query: (newCategory) => ({
				url: "/categories", // The endpoint in your backend
				method: "POST",
				body: newCategory,
			}),
			invalidatesTags: [{ type: "Category", id: "LIST" }], // Invalidate the list cache
		}),
		// Query for getting categories with pagination
		getCategories: builder.query<
			{
				categories: ICategory[];
				total: number;
				page: number;
				limit: number;
				totalPages: number;
			},
			{ page?: number; limit?: number }
		>({
			query: ({ page = 1, limit = 10 }) => ({
				url: `/categories`,
				params: { page, limit }, // Send pagination params as query parameters
			}),
			providesTags: (result) =>
				result
					? [
							...result.categories.map(({ _id }) => ({
								type: "Category" as const,
								id: _id,
							})),
							{ type: "Category", id: "LIST" },
					  ]
					: [{ type: "Category", id: "LIST" }],
		}),
		// Query for getting a single category by ID
		getCategoryById: builder.query<ICategory, string>({
			query: (_id) => ({
				url: `/categories/${_id}`,
			}),
			providesTags: (result, error, _id) => [
				{ type: "Category", id: _id },
			],
		}),

		// Query for getting subcategories with pagination
		getSubCategoriesById: builder.query<
			{
				categories: ICategory[];
				total: number;
				page: number;
				limit: number;
				totalPages: number;
			},
			{
				parentCategoryId: string;
				page: number;
				limit: number;
				level: string;
			}
		>({
			query: ({ parentCategoryId, page, limit, level }) => ({
				url: `/categories/get-subcategories/${parentCategoryId}`,
				params: {
					level,
					page,
					limit,
				},
			}),
			providesTags: (result, error, { parentCategoryId }) =>
				result
					? [
							...result.categories.map(({ _id }) => ({
								type: "Category" as const,
								id: _id,
							})),
							{
								type: "Category",
								id: `SUBCATEGORY_${parentCategoryId}`,
							},
							{ type: "Category", id: "LIST" }, // Invalidate the list cache
					  ]
					: [
							{
								type: "Category",
								id: `SUBCATEGORY_${parentCategoryId}`,
							},
					  ],
		}),
		// Mutation for updating a category
		updateCategory: builder.mutation<ICategory, Partial<ICategory>>({
			query: ({ _id, ...rest }) => ({
				url: `/categories/${_id}`,
				method: "PUT",
				body: rest,
			}),
			invalidatesTags: (result, error, { _id, parentCategory }) => [
				{ type: "Category", id: _id },
				{ type: "Category", id: "LIST" }, // Invalidate the list cache
				{ type: "Category", id: `SUBCATEGORY_${parentCategory}` }, // Invalidate subcategories of the parent
			],
		}),
		// Mutation for deleting a category
		deleteCategory: builder.mutation<{ success: boolean }, string>({
			query: (_id) => ({
				url: `/categories/${_id}`,
				method: "DELETE",
			}),
			invalidatesTags: [
				{ type: "Category", id: "LIST" }, // Invalidate the list cache
			],
		}),
	}),
});

export const {
	useCreateCategoryMutation,
	useGetCategoriesQuery,
	useGetCategoryByIdQuery,
	useGetSubCategoriesByIdQuery, // New query to fetch subcategories
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} = categoryApi;
