import ProductDetailsPage from "@/components/productPage/productDetails";
import UserLayout from "@/Layouts/UserLayout";
import { useGetProductByIdQuery } from "@/store/apis/productApi";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = ({ params }: any) => {
	return {
		props: {
			params,
		},
	};
};

export default function Index({ params }: any) {
	const {
		data: product,
		isLoading,
		refetch,
	} = useGetProductByIdQuery(params.id);

	useEffect(() => {
		refetch();
	}, [refetch]);

	const metaKey = product?.metaKey;
	const productName = product?.name;
	return (
		<UserLayout isCheckAuth={false}>
			<Head>
				<title className="capitalize">{productName}</title>
				<meta
					name="description"
					content="Explore detailed information about our products, select your desired options, and easily add items to your shopping cart. Shop with confidence at My Medicine Store."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta
					name="keywords"
					content={
						metaKey ||
						"medicine, health, pharmaceuticals, online store"
					}
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={` ${inter.className}`}>
				<ProductDetailsPage
					productId={params.id}
					isLoading={isLoading}
					product={product}
				/>
			</main>
		</UserLayout>
	);
}
