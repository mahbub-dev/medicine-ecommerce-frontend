import { useUpdateOrderStatusMutation } from "@/store/orderApi";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
// Possible statuses
const statuses: Array<string> = [
	"pending",
	"processing",
	"shipped",
	"delivered",
	"cancelled",
];

interface OrderStatusUpdaterProps {
	currentStatus: { orderId: string; status: string };
	onStatusChange: (newStatus: string) => Promise<void>;
}

const OrderStatusUpdater: React.FC<OrderStatusUpdaterProps> = ({
	currentStatus,
	onStatusChange,
}) => {
	const [status, setStatus] = useState<string>(currentStatus.status);
	const [updateOrderStatus, { isLoading: isUpdating }] =
		useUpdateOrderStatusMutation();

	const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const newStatus = event.target.value;
		setStatus(newStatus);
	};

	const handleUpdateClick = async () => {
		try {
			await updateOrderStatus({ _id: currentStatus.orderId, status });
      onStatusChange(status)
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong");
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white  rounded-lg overflow-hidden p-6">
			<h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
			<div className="flex items-center mb-4">
				<span className="font-medium text-gray-700 mr-4">
					Current Status:
				</span>
				<span className="text-gray-900 capitalize">{status}</span>
			</div>
			<div className="mb-4">
				<select
					value={status}
					onChange={handleStatusChange}
					className="block w-full p-2 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					disabled={isUpdating}>
					{statuses.map((statusOption) => (
						<option key={statusOption} value={statusOption}>
							{statusOption.charAt(0).toUpperCase() +
								statusOption.slice(1)}
						</option>
					))}
				</select>
			</div>
			<button
				onClick={handleUpdateClick}
				className="btn-primary"
				disabled={isUpdating}>
				{isUpdating ? "Please wait..." : "Update"}
			</button>
		</div>
	);
};

export default OrderStatusUpdater;
