import UsersList from "@/components/admin/users/userList";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import Head from "next/head";
import Link from "next/link";

const Users = () => {
	return (
		<SuperAdminLayout>
			<Head>
				<title>Super Admin Dashboard</title>
				<meta
					name="description"
					content="Manage admin accounts in the super admin dashboard. Add, edit, or delete users as needed."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Link rel="icon" href="/favicon.ico" />
			</Head>
			<h2 className="text-2xl font-semibold text-gray-700">
				Manage Admin
			</h2>
			<UsersList />
		</SuperAdminLayout>
	);
};

export default Users;
