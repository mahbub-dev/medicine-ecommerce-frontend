import Modal from "@/components/common/GlobalModal";
import GlobalPagination from "@/components/common/Pagination";
import RoleUpdater from "@/components/super-admin/roleUpdater";
import usePagination from "@/hooks/usePagination";
import { useGetUsersQuery } from "@/store/apis/userApi";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
const UsersList = () => {
	const { page, router } = usePagination();
	const [openRoleUpdateView, setOpenRoleUpdateViewe] = useState<any | null>(
		null
	);
	const { data, error, isLoading, refetch } = useGetUsersQuery({
		page,
		limit: 10,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoading) return <div className="text-center">Loading...</div>;
	if (error || data?.users.length === 0)
		return <div className="text-center">No Data Found</div>;
	// if (error) return <div>Error loading users.</div>;

	// Use real data if available; otherwise, fallback to dummy data
	const users = data?.users.length ? data.users : [];
	const isSuperAdmin = router?.pathname?.includes("super-admin");

	return (
		<div className="container mx-auto p-6">
			{/* <h2 className="text-3xl font-bold mb-6 text-gray-800">User List</h2> */}
			<div className="overflow-x-auto shadow-md rounded-lg">
				<table className="min-w-full bg-white">
					<thead className="bg-gray-800 text-white">
						<tr>
							<th className="py-3 px-6 text-left">Name</th>
							<th className="py-3 px-6 text-left">Email</th>
							<th className="py-3 px-6 text-left">Role</th>
							<th className="py-3 px-6 text-left">
								Email Verified
							</th>
						</tr>
					</thead>
					<tbody className="text-gray-700">
						{users.map((user) => (
							<tr key={user._id} className="border-b">
								<td className="py-3 px-6">{user.name}</td>
								<td className="py-3 px-6">{user.email}</td>
								<td className="py-3 px-6 capitalize flex gap-2 items-center">
									<span> {user.role}</span>
									{isSuperAdmin && (
										<BiEdit
											onClick={() =>
												setOpenRoleUpdateViewe({
													userId: user._id,
													currentRole: user.role,
												})
											}
											size={20}
											className="text-blue-500 cursor-pointer"
										/>
									)}
								</td>
								<td className="py-3 px-6">
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											user.isEmailVerified
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}>
										{user.isEmailVerified ? "Yes" : "No"}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{(data?.users.length as number) > 0 && (
				<GlobalPagination
					// total={totalData}
					totalPages={data?.totalPages as number}
					onPageChange={(newPage) => {}}
				/>
			)}
			<Modal
				isOpen={openRoleUpdateView}
				onClose={function (): void {
					setOpenRoleUpdateViewe(null);
				}}>
				<RoleUpdater
					currentRole={openRoleUpdateView?.currentRole}
					userId={openRoleUpdateView?.userId}
					onRoleUpdate={function () {
						return setOpenRoleUpdateViewe(null);
					}}
				/>
			</Modal>
		</div>
	);
};

export default UsersList;
