import usePagination from "@/hooks/usePagination";
import useOrderFilters from "@/hooks/userFilterHook";
import { useGetOrdersQuery } from "@/store/orderApi";
import Link from "next/link";
import { useEffect } from "react";
import GlobalPagination from "../common/Pagination";
import Filter from "../common/orderFilterComponent";

const OrdersPage = () => {
	const { page } = usePagination();
	const { startDate, endDate, status } = useOrderFilters();
	const { data, isLoading, error, refetch } = useGetOrdersQuery({
		page,
		limit: 10,
		startDate,
		status,
		endDate,
		getBy: "getbyuser",
	});
	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading orders.</p>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Your Orders</h1>
			<Filter />
			{data?.orders.length === 0 ? (
				<p>You have no orders.</p>
			) : (
				<ul className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4">
					{data?.orders.map((order: any) => (
						<li
							key={order._id}
							className="mb-4 p-4 border rounded-lg">
							{/* <p>Order ID: {order._id}</p> */}
							<p>Products: {order.products[0].product.name} <span className="text-green-500">{order.products.length>1  && 'and more..'}</span></p>
							<p>Total: ${order.totalPrice.toFixed(2)}</p>
							<p className="capitalize">Status: {order.status}</p>
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
