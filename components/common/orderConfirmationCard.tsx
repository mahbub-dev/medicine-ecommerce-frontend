import Link from "next/link";

const OrderConfirmationCard = () => {
	return (
		<div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
			<div className="text-center">
				<h2 className="text-2xl font-semibold text-green-600">
					Order Confirmed!
				</h2>
				<p className="mt-4 text-gray-600">
					Your order has been successfully placed. Thank you for
					shopping with us!
				</p>
			</div>
			<div className="mt-6 flex justify-center space-x-4">
				<Link
					href={"/orders"}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
					View Orders
				</Link>
				<Link
					className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
					href={"/"}>
					Go to Home
				</Link>
			</div>
		</div>
	);
};

export default OrderConfirmationCard;
