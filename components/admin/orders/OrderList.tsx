import Modal from "@/components/common/GlobalModal";
import Filter from "@/components/common/orderFilterComponent";
import GlobalPagination from "@/components/common/Pagination"; // Import the pagination component
import usePagination from "@/hooks/usePagination";
import useOrderFilters from "@/hooks/userFilterHook";
import { Order, useGetOrdersQuery } from "@/store/apis/orderApi";
import React, { useEffect, useState } from "react";
import { GrEdit, GrFormView } from "react-icons/gr";
import OrderedProductView from "./OrderedProductsVieiw";
import ShippingAddressView from "./ShippingAddressView";
import OrderStatusUpdater from "./UpdateStatus";

// import { Order } from "./types"; // Import the order type
interface OrderListProps {
	onEdit: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({ onEdit }) => {
	const { page } = usePagination();
	const { startDate, endDate, status } = useOrderFilters();
	const { data, isLoading, error, refetch } = useGetOrdersQuery({
		page,
		limit: 10,
		getBy: "getbyadmin",
		startDate,
		endDate,
		status,
	});

	const [openProductsView, setOpenProductsView] = useState<any | null>(null);
	const [openShippingAddressView, setOpenShippingAddressView] = useState<
		any | null
	>(null);
	const [openUpdateStatusView, setOpenUpdateStatusView] = useState<
		any | null
	>(null);

	const handleStatusChange = async () => {};
	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoading)
		return (
			<div className="flex items-center min-screen justify-center">
				Loading...
			</div>
		);
	if (error)
		return (
			<div className="flex items-center min-screen justify-center">
				Something went wrong.
			</div>
		);
	return (
		<div className="overflow-x-auto shadow-md rounded-lg mt-4">
			<Filter />
			{data?.orders.length === 0 && (
				<div className="">
					<p className="py-3 px-6 flex items-center justify-center">
						No Orders Found{" "}
					</p>
				</div>
			)}
			{(data?.orders.length as number) > 0 && (
				<div className="mb-4">
					<table className="min-w-full bg-white">
						<thead className="bg-gray-800 text-white">
							<tr>
								<th className="py-3 px-6 text-left">
									Customer
								</th>
								<th className="py-3 px-6 text-left">
									Products
								</th>
								<th className="py-3 px-6 text-left">Ship to</th>
								<th className="py-3 px-6 text-left">
									Shiping Cost
								</th>
								<th className="py-3 px-6 text-left">
									Discount
								</th>
								<th className="py-3 px-6 text-left">Date</th>
								<th className="py-3 px-6 text-left">Status</th>
								<th className="py-3 px-6 text-left">Total</th>
								{/* <th className="py-3 px-6 text-left">Actions</th> */}
							</tr>
						</thead>
						<tbody className="text-gray-700">
							{data?.orders.map((order) => (
								<tr key={order._id} className="border-b">
									<td className="py-3 px-6 capitalize">
										{order.user?.name}
									</td>

									<td
										onClick={() =>
											setOpenProductsView(order.products)
										}
										className="py-3 flex items-center gap-2 px-6 hover:underline hover:text-blue-500 cursor-pointer capitalize">
										<span>
											{" "}
											{order.products[0]?.product.name?.slice(
												0,
												20
											)}{" "}
											...
										</span>
										<GrFormView size={24} />
									</td>

									<td
										onClick={() =>
											setOpenShippingAddressView(
												order.shipping.shippingAddress
											)
										}
										className="py-3  items-center gap-2 px-6 hover:underline hover:text-blue-500 cursor-pointer capitalize">
										<span className="inline">
											{order?.shipping.shippingAddress?.address.slice(
												0,
												25
											)}{" "}
											...
										</span>
										<GrFormView
											className="inline"
											size={24}
										/>
									</td>
									<td className="py-3 px-6">
										${order?.shipping.shippingCost}
									</td>
									<td className="py-3 px-6">
										${order.totalDiscount}
									</td>
									<td className="py-3 px-6">
										{new Date(
											order?.createdAt
										).toLocaleDateString()}
									</td>
									<td
										className={`${
											order.status === "cancelled"
												? "text-red-500"
												: ""
										} py-3 px-6  hover:underline hover:text-blue-500 cursor-pointer  capitalize  `}
										onClick={() => {
										
												setOpenUpdateStatusView({
													status: order.status,
													orderId: order._id,
													statusUpdates:
														order.statusUpdates,
												});
										}}>
										<span className="inline mr-2 ">
											{order.status}
										</span>

										<GrEdit className="inline" />
									</td>
									<td className="py-3 px-6">
										${order?.totalPrice.toFixed(2)}
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<GlobalPagination
						// currentPage={currentPage}
						totalPages={data?.totalPages as number}
						onPageChange={() => {}}
					/>
				</div>
			)}

			<Modal
				isOpen={openProductsView}
				onClose={function (): void {
					setOpenProductsView(null);
				}}>
				<OrderedProductView Products={openProductsView} />
			</Modal>
			<Modal
				isOpen={openShippingAddressView}
				onClose={function (): void {
					setOpenShippingAddressView(null);
				}}>
				<ShippingAddressView address={openShippingAddressView} />
			</Modal>
			<Modal
				isOpen={openUpdateStatusView}
				onClose={function (): void {
					setOpenUpdateStatusView(null);
				}}>
				<OrderStatusUpdater
					onStatusChange={async () => setOpenUpdateStatusView(null)}
					currentStatus={openUpdateStatusView}
				/>
			</Modal>
		</div>
	);
};

export default OrderList;
