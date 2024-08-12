import baseQueryWithReauth from "@/utils/apiRequest";
import { createApi } from "@reduxjs/toolkit/query/react";
export interface Order {
	_id?: string;
	customerName: string;
	date: string;
	status: "pending" | "shipped" | "delivered" | "canceled";
	totalAmount: number;
	items: {
		productId: string;
		productName: string;
		quantity: number;
		price: number;
	}[];
}

export const orderApi = createApi({
	reducerPath: "orderApi",
	baseQuery: baseQueryWithReauth, // Replace with your base URL
	tagTypes: ["Order"],
	endpoints: (builder) => ({
		getOrders: builder.query<
			{ orders: Order[]; total: number },
			{ page: number; limit: number }
		>({
			query: ({ page, limit }) => ({
				url: "/orders",
				params: { page, limit },
			}),
			providesTags: (result) =>
				result
					? [
							...result.orders.map(({ _id }) => ({
								type: "Order" as const,
								id: _id,
							})),
							{ type: "Order", id: "LIST" },
					  ]
					: [{ type: "Order", id: "LIST" }],
		}),
		getOrderById: builder.query<Order, string>({
			query: (id) => `/orders/${id}`,
			providesTags: (result, error, id) => [{ type: "Order", id }],
		}),
		createOrder: builder.mutation<Order, Partial<Order>>({
			query: (order) => ({
				url: "/orders",
				method: "POST",
				body: order,
			}),
			invalidatesTags: [{ type: "Order", id: "LIST" }],
		}),
		updateOrder: builder.mutation<Order, Partial<Order>>({
			query: ({ _id, ...rest }) => ({
				url: `/orders/${_id}`,
				method: "PUT",
				body: rest,
			}),
			invalidatesTags: (result, error, { _id }) => [
				{ type: "Order", id: _id },
			],
		}),
		deleteOrder: builder.mutation<{ success: boolean }, string>({
			query: (id) => ({
				url: `/orders/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Order", id: "LIST" }],
		}),
	}),
});

export const {
	useGetOrdersQuery,
	useGetOrderByIdQuery,
	useCreateOrderMutation,
	useUpdateOrderMutation,
	useDeleteOrderMutation,
} = orderApi;
