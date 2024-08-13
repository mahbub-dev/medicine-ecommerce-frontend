import ProductDetail from "@/components/admin/products/ProductDetails";
import DashboardLayout from "@/Layouts/AdminLayouts";
import Head from "next/head";
export const getServerSideProps = ({ params }: any) => {
	return { props: { params } };
};
const AdminProductDetails = ({params}:any) => {
	return (
		<DashboardLayout>
			<Head>
				<title>Manage SingleProduct - Admin Dashboard</title>
				<meta
					name="description"
					content="Manage SingleProduct in the admin dashboard. Add, edit, or delete SingleProduct as needed."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h2 className="text-2xl font-semibold text-gray-700">
				Product Details
			</h2>
			<ProductDetail productId={params.id} onUpdate={function (): void {}} />
		</DashboardLayout>
	);
};

export default AdminProductDetails;
