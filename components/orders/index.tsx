import usePagination from "@/hooks/usePagination";
import { useGetOrdersQuery } from "@/store/orderApi";
import Link from "next/link";
import GlobalPagination from "../common/Pagination";

const OrdersPage = () => {
	const { page } = usePagination();
	const { data, isLoading, error } = useGetOrdersQuery({ page, limit: 10 });

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading orders.</p>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Your Orders</h1>
			{data?.orders.length === 0 ? (
				<p>You have no orders.</p>
			) : (
				<ul className="grid grid-cols-3 gap-4">
					{data?.orders.map((order: any) => (
						<li
							key={order._id}
							className="mb-4 p-4 border rounded-lg">
							<p>Order ID: {order._id}</p>
							<p>Total: ${order.totalPrice.toFixed(2)}</p>
							<p>Status: {order.status}</p>
							<p>
								Placed at:{" "}
								{new Date(order.createdAt).toLocaleDateString()}
							</p>{" "}
							{/* Displaying the "Placed at" field */}
							<Link href={`/orders/${order._id}`}>
								<span className="text-blue-500 hover:underline">
									View Details
								</span>
							</Link>
						</li>
					))}
				</ul>
			)}
			<GlobalPagination
				totalPages={data?.totalPages as number}
				onPageChange={function (page: number): void {}}
			/>
		</div>
	);
};

export default OrdersPage;
