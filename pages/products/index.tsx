import UserLayout from "@/Layouts/UserLayout";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
export const getServerSideProps = ({ params }: any) => {
	return {
		props: {
			params,
		},
	};
};
export default function Index() {
	return (
		<UserLayout>
			<Head>
				<title>Product Details Page</title>
				<meta
					name="description"
					content="Explore detailed information about our products, select your desired options, and easily add items to your shopping cart. Shop with confidence at My Medicine Store."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main
				className={`flex min-h-screen items-center justify-center p-4 ${inter.className}`}>
				{/* <ProductDetailsPage productId={params.productId} /> */}
			</main>
		</UserLayout>
	);
}
