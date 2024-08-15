import StatusUpdateTimeline from "@/components/orders/statusUpdateTimeline";
import { useUpdateOrderStatusMutation } from "@/store/orderApi";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Possible statuses
const allStatuses: Array<string> = [
	"pending",
	"processing",
	"shipped",
	"delivered",
	"cancelled",
];

interface OrderStatusUpdaterProps {
	currentStatus: { orderId: string; status: string; statusUpdates: any[] };
	onStatusChange: (newStatus: string) => Promise<void>;
}

const OrderStatusUpdater: React.FC<OrderStatusUpdaterProps> = ({
	currentStatus,
	onStatusChange,
}) => {
	// Compute available statuses based on the current status
	const computeAvailableStatuses = (currentStatus: string) => {
		const index = allStatuses.indexOf(currentStatus);
		if (index === -1) return [];

		let possibleStatuses = allStatuses.slice(index + 1);

		// Exclude 'cancelled' if current status is 'delivered'
		if (currentStatus === "delivered") {
			possibleStatuses = possibleStatuses.filter(
				(status) => status !== "cancelled"
			);
		}

		return possibleStatuses;
	};

	const [status, setStatus] = useState<string>(currentStatus.status);
	const [availableStatuses, setAvailableStatuses] = useState<string[]>(
		computeAvailableStatuses(currentStatus.status)
	);
	const [updateOrderStatus, { isLoading: isUpdating }] =
		useUpdateOrderStatusMutation();

	useEffect(() => {
		setAvailableStatuses(computeAvailableStatuses(currentStatus.status));
	}, [currentStatus.status]);

	const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const newStatus = event.target.value;
		setStatus(newStatus);
	};

	const handleUpdateClick = async () => {
		try {
			await updateOrderStatus({ _id: currentStatus.orderId, status });
			await onStatusChange(status);
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong");
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden p-6">
			<StatusUpdateTimeline statusUpdates={currentStatus.statusUpdates} />
			{!["cancelled", "delivered"].includes(currentStatus.status) && (
				<>
					<div className="flex items-center mb-4">
						<span className="font-medium text-gray-700 mr-4">
							Current Status:
						</span>
						<span className="text-gray-900 capitalize">
							{currentStatus.status}
						</span>
					</div>
					<div className="mb-4">
						<select
							value={status}
							onChange={handleStatusChange}
							className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							disabled={isUpdating}>
							{availableStatuses.map((statusOption) => (
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
				</>
			)}
		</div>
	);
};

export default OrderStatusUpdater;
