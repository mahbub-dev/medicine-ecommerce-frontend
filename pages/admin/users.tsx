import UsersList from "@/components/admin/users/userList";
import DashboardLayout from "@/Layouts/AdminLayouts";
import Head from "next/head";
import Link from "next/link";

const Users = () => {
	return (
		<DashboardLayout>
			<Head>
				<title>Manage Users - Admin Dashboard</title>
				<meta
					name="description"
					content="Manage user accounts in the admin dashboard. Add, edit, or delete users as needed."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Link rel="icon" href="/favicon.ico" />
			</Head>
			<h2 className="text-2xl font-semibold text-gray-700">
				Manage Users
			</h2>
			<UsersList />
		</DashboardLayout>
	);
};

export default Users;
