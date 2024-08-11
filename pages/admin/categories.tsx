import CategoryManager from "@/components/admin/categories/categoryManager";
import DashboardLayout from "@/Layouts/AdminLayouts";
import Head from "next/head";

const Categories = () => {
	return (
		<DashboardLayout>
			<Head>
				<title>Manage Categories - Admin Dashboard</title>
				<meta
					name="description"
					content="Manage product categories in the admin dashboard. Add, edit, or delete categories as needed."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h2 className="text-2xl font-semibold text-gray-700">
				Manage Categories
			</h2>
			<CategoryManager />
		</DashboardLayout>
	);
};

export default Categories;
