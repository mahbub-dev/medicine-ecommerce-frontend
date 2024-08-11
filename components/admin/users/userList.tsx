import { useGetUsersQuery } from "@/store/userApi";
import { useState } from "react";

const UsersList = () => {
	const [page, setPage] = useState(1);
	const limit = 10; // Number of users per page

	const { data, error, isLoading } = useGetUsersQuery({ page, limit });

	const handleNextPage = () => {
		if (data && page * limit < data.total) {
			setPage(page + 1);
		}
	};

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	// Dummy data to use if no real data is found
	const dummyData = [
		{
			_id: "1",
			name: "John Doe",
			email: "johndoe@example.com",
			role: "user",
			isEmailVerified: true,
		},
		{
			_id: "2",
			name: "Jane Smith",
			email: "janesmith@example.com",
			role: "admin",
			isEmailVerified: false,
		},
		// Add more dummy users as needed
	];

	if (isLoading) return <div className="text-center">Loading...</div>;
	// if (error) return <div>Error loading users.</div>;

	// Use real data if available; otherwise, fallback to dummy data
	const users = data?.users.length ? data.users : dummyData;

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
							<th className="py-3 px-6 text-left">Email Verified</th>
						</tr>
					</thead>
					<tbody className="text-gray-700">
						{users.map((user) => (
							<tr key={user._id} className="border-b">
								<td className="py-3 px-6">{user.name}</td>
								<td className="py-3 px-6">{user.email}</td>
								<td className="py-3 px-6 capitalize">{user.role}</td>
								<td className="py-3 px-6">
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											user.isEmailVerified
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{user.isEmailVerified ? "Yes" : "No"}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex justify-between items-center mt-6">
				<button
					onClick={handlePreviousPage}
					disabled={page === 1}
					className={`px-4 py-2 rounded-md ${
						page === 1
							? "bg-gray-300 cursor-not-allowed"
							: "bg-gray-800 text-white hover:bg-gray-700"
					}`}
				>
					Previous
				</button>
				<span className="text-gray-600">
					Page {page} of {Math.ceil((data?.total || dummyData.length) / limit)}
				</span>
				<button
					onClick={handleNextPage}
					disabled={page * limit >= (data?.total || dummyData.length)}
					className={`px-4 py-2 rounded-md ${
						page * limit >= (data?.total || dummyData.length)
							? "bg-gray-300 cursor-not-allowed"
							: "bg-gray-800 text-white hover:bg-gray-700"
					}`}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default UsersList;
