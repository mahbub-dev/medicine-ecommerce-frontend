import { useGetOrderByIdQuery } from "@/store/orderApi";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "../common/GlobalModal";
import StatusUpdateTimeline from "./statusUpdateTimeline";

const OrderDetailsPage = ({ id }: any) => {
	const router = useRouter();
	const {
		data: order,
		isLoading,
		error,
		refetch,
	} = useGetOrderByIdQuery(id as string);

	useEffect(() => {
		refetch();
	}, [refetch]);

	const [openStatusTimeline, setOpenStatusTimeline] = useState<any | null>(
		null
	);
	if (isLoading) return <p>Loading...</p>;
	// if (error) return <p>Error loading order details.</p>;
	if (!order) return <p>No order found.</p>;

	return (
		<div className="container mx-auto py-10">
			{/* Image section */}
			{/* <div className="mb-8">
        <img
          src="/path/to/your/image.jpg" // Replace with actual image path
          alt="Order"
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div> */}

			{/* Order Details Table */}
			<h1 className="text-2xl font-bold mb-4">Order Details</h1>
			<table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mb-8 capitalize">
				<tbody>
					<tr>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Order ID
						</th>
						<td className="px-6 py-3 border-b border-gray-300">
							{order._id}
						</td>
					</tr>
					<tr>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Total Price
						</th>
						<td className="px-6 py-3 border-b border-gray-300">
							${order.totalPrice.toFixed(2)}
						</td>
					</tr>
					<tr>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Shipping Cost
						</th>
						<td className="px-6 py-3 border-b border-gray-300">
							${order.shipping.shippingCost.toFixed(2)}
						</td>
					</tr>
					<tr>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Status
						</th>
						<td className="px-6 py-3 border-b border-gray-300 flex items-center gap-2">
							{order.status}
							<span
								className="text-blue-500  cursor-pointer"
								onClick={() =>
									setOpenStatusTimeline(order.statusUpdates)
								}>
								Track Order
							</span>
						</td>
					</tr>
					<tr>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Placed at
						</th>
						<td className="px-6 py-3 border-b border-gray-300">
							{new Date(
								order.createdAt as Date
							).toLocaleDateString()}
						</td>
					</tr>
				</tbody>
			</table>

			{/* Shipping Address Table */}
			<h2 className="text-xl font-semibold mt-8 mb-4">
				Shipping Address
			</h2>
			<table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mb-8">
				<tbody>
					<tr>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Name
						</th>
						<td className="px-6 py-3 border-b border-gray-300">
							{order.shipping.shippingAddress.name}
						</td>
					</tr>
					<tr>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Address
						</th>
						<td className="px-6 py-3 border-b border-gray-300">
							{order.shipping.shippingAddress.address}
						</td>
					</tr>
					<tr>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Division
						</th>
						<td className="px-6 py-3 border-b border-gray-300">
							{order.shipping.shippingAddress.division}
						</td>
					</tr>
					<tr>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							District
						</th>
						<td className="px-6 py-3 border-b border-gray-300">
							{order.shipping.shippingAddress.district}
						</td>
					</tr>
					<tr>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Sub-District
						</th>
						<td className="px-6 py-3 border-b border-gray-300">
							{order.shipping.shippingAddress.subDistrict}
						</td>
					</tr>
					<tr>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Phone
						</th>
						<td className="px-6 py-3 border-b border-gray-300">
							{order.shipping.shippingAddress.phone}
						</td>
					</tr>
				</tbody>
			</table>

			{/* Items Table */}
			<h2 className="text-xl font-bold mt-8 mb-4">Items</h2>
			<table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
				<thead>
					<tr className="">
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Image
						</th>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Product
						</th>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Description
						</th>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Quantity
						</th>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Variant
						</th>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Price
						</th>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Discount
						</th>
						<th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
							Total Price
						</th>
					</tr>
				</thead>
				<tbody>
					{order?.products.map((item: any) => {
						const subtotal = item.variant.price * item.quantity;
						const discount =
							(item.product.discount / 100) * subtotal;
						const total = subtotal - discount;
						return (
							<tr key={item?._id} className="text-sm">
								<td className="px-6 py-4 border-b border-gray-300">
									<Image
										width={100}
										height={10}
										src={item.product.photos[0]} // Replace with the actual path to the image
										alt={item.product.name}
										className="w-16 h-16 object-cover rounded-md"
									/>
								</td>
								<td className="px-6 py-4 border-b border-gray-300">
									{item?.product?.name}
								</td>
								<td className="px-6 py-4 border-b border-gray-300">
									{item?.product?.description}
								</td>
								<td className="px-6 py-4 border-b border-gray-300">
									{item?.quantity}
								</td>
								<td className="px-6 py-4 border-b border-gray-300">
									{item?.variant?.name}
								</td>
								<td className="px-6 py-4 border-b border-gray-300">
									${item?.variant?.price.toFixed(2)}
								</td>
								<td className="px-6 py-4 border-b border-gray-300">
									${discount.toFixed(2)}
								</td>
								<td className="px-6 py-4 border-b border-gray-300">
									${total.toFixed(2)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Modal
				isOpen={openStatusTimeline}
				onClose={function (): void {
					setOpenStatusTimeline(null);
				}}>
				<StatusUpdateTimeline statusUpdates={openStatusTimeline} />
			</Modal>
		</div>
	);
};

export default OrderDetailsPage;
