import { IProduct, Variant } from "@/components/admin/products/types";
import baseQueryWithReauth from "@/utils/apiRequest";
import { createApi } from "@reduxjs/toolkit/query/react";
export interface Order {
	createdAt?: any;
	products?: any;
	_id?: string;
	user: any;
	status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
	items: {
		product: IProduct[];
		variant: Variant;
		quantity: number;
	}[];
	totalPrice: number;
	totalDiscount: number;
	shipping: {
		shippingCost: number;
		shippingAddress: any;
	};

	statusUpdates?: { status: string; updatedAt: Date }[]; // Array to track status chan
}

export const orderApi = createApi({
	reducerPath: "orderApi",
	baseQuery: baseQueryWithReauth, // Replace with your base URL
	tagTypes: ["Order"],
	endpoints: (builder) => ({
		getOrders: builder.query<
			{
				orders: Order[];
				total: number;
				totalPages: number;
				limit: number;
			},
			{
				page: number;
				limit: number;
				getBy: "getbyuser" | "getbyadmin";
				startDate?: string;
				endDate?: string;
				status?: string;
			}
		>({
			query: ({ page, limit, status, startDate, endDate, getBy }) => ({
				url: `/orders/${getBy}`,
				params: { page, limit, status, startDate, endDate },
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
		updateOrderStatus: builder.mutation<any, Partial<any>>({
			query: ({ _id, status }) => ({
				url: `/orders/update-order-status/${_id}`,
				method: "PUT",
				body: { status },
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
	useUpdateOrderStatusMutation
} = orderApi;
