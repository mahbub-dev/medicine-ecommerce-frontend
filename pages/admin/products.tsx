import ProductManager from "@/components/admin/products";
import DashboardLayout from "@/Layouts/AdminLayouts";
import Head from "next/head";

const Products = () => {
	return (
		<DashboardLayout>
			<Head>
				<title>Manage Products - Admin Dashboard</title>
				<meta
					name="description"
					content="Manage products in the admin dashboard. Add, edit, or delete products as needed."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h2 className="text-2xl font-semibold text-gray-700">
				Manage Products
			</h2>
			<ProductManager />
		</DashboardLayout>
	);
};

export default Products;
