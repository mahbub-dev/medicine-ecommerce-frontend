import { useGetOrderByIdQuery } from "@/store/orderApi";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
	if (isLoading) return <p>Loading...</p>;
	// if (error) return <p>Error loading order details.</p>;
	if (!order) return <p>No order found.</p>;
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-2xl font-bold mb-4">Order Details</h1>
			<p className="text-lg font-semibold">Order ID: {order._id}</p>
			<p>Total Price: ${order.totalPrice.toFixed(2)}</p>
			<p>Status: {order.status}</p>
			<p>
				Placed at:{" "}
				{new Date(order?.createdAt as Date).toLocaleDateString()}
			</p>
			<h2 className="text-xl font-semibold mt-4">Shipping Address</h2>
			<p>Name: {order.shipping.shippingAddress.name}</p>
			<p>Address: {order.shipping.shippingAddress.address}</p>
			<p>Division: {order.shipping.shippingAddress.division}</p>
			<p>District: {order.shipping.shippingAddress.district}</p>
			<p>Sub-District: {order.shipping.shippingAddress.subDistrict}</p>
			<p>Phone: {order.shipping.shippingAddress.phone}</p>

			<h2 className="text-xl font-bold mt-4">Items</h2>
			<ul className="grid grid-cols-3 gap-4">
				{order?.products.map((item: any) => {
					const subtotal = item.variant.price * item.quantity;
					const discount = (item.product.discount / 100) * subtotal;
					const total = subtotal - discount;
					return (
						<li
							key={item?._id}
							className="mb-4 p-4 border rounded-lg">
							<p>Product: {item?.product?.name}</p>
							<p>Description: {item?.product?.description}</p>
							<p>Quantity: {item?.quantity}</p>
							<p>Variant: {item?.variant?.name}</p>
							<p>Price: ${item?.variant?.price}</p>
							<p>Discount: ${discount}</p>
							<p>Total Price : ${total - discount}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default OrderDetailsPage;
