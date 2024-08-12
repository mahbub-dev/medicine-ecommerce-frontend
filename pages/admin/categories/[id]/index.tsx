import CategoryDetails from "@/components/admin/categories/categoryDetails";
import DashboardLayout from "@/Layouts/AdminLayouts";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
export const getServerSideProps = async ({ params }: any) => {
	return {
		props: { params },
	};
};
const Categories = ({ params }: any) => {
	return (
		<DashboardLayout>
			<Head>
				<title>Category Details - Admin Dashboard</title>
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
				Category Details
			</h2>
			<CategoryDetails id={params.id} />
		</DashboardLayout>
	);
};

export default Categories;
