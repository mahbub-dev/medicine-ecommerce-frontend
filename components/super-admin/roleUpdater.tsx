import { useUpdateUserRoleMutation } from "@/store/apis/userApi";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
// Possible roles
const roles: Array<string> = ["super-admin", "admin", "user"];

interface RoleUpdaterProps {
	currentRole: string;
	userId: string;
	onRoleUpdate: () => void;
}

const RoleUpdater: React.FC<RoleUpdaterProps> = ({
	currentRole,
	userId,
	onRoleUpdate,
}) => {
	const [selectedRole, setSelectedRole] = useState<string>(currentRole);
	const [updateUser, { isLoading: isUpdating }] = useUpdateUserRoleMutation();
	const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedRole(event.target.value);
	};

	const handleUpdateClick = async () => {
		try {
			await updateUser({ userId, newRole: selectedRole });
			onRoleUpdate();
		} catch (error: any) {
			toast.error(error?.data?.message || "Failed to update role");
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden p-6">
			<h2 className="text-xl font-semibold mb-4">Update User Role</h2>
			<div className="mb-4">
				<label
					htmlFor="role"
					className="block text-sm font-medium text-gray-700 mb-2">
					Select New Role:
				</label>
				<select
					id="role"
					value={selectedRole}
					onChange={handleRoleChange}
					className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					disabled={isUpdating}>
					{roles.map((role) => (
						<option key={role} value={role}>
							{role.charAt(0).toUpperCase() + role.slice(1)}
						</option>
					))}
				</select>
			</div>
			<button
				onClick={handleUpdateClick}
				className="btn-primary"
				disabled={isUpdating}>
				{isUpdating ? "Updating..." : "Update Role"}
			</button>
		</div>
	);
};

export default RoleUpdater;
