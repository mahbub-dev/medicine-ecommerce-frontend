import ProductCard from "@/components/productPage/productCard";
import UserLayout from "@/Layouts/UserLayout";
import { useGetProductsQuery } from "@/store/apis/productApi";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });
const RenderProducts = () => {
	const { data, error, isLoading, refetch } = useGetProductsQuery({
		page: 1,
		limit: 6,
	});
	useEffect(() => {
		refetch();
	}, [refetch]);
	// Pass the product ID or parameter as needed
	if (isLoading)
		return <div className="text-center flex items-center">Loading...</div>;
	if (error) return <div>Error fetching product data</div>;
	return (
		<main className={`container mx-auto py-10 ${inter.className}`}>
			{data?.products.length === 0 && (
				<div className="text-center flex items-center justify-center">
					No Data Found
				</div>
			)}
			<div className="flex flex-wrap gap-4">
				{data?.products.length !== 0 &&
					data?.products.map((product: any) => (
						<ProductCard product={product} key={product._id} />
					))}
			</div>
			{(data?.products.length as number) > 6 && (
				<Link
					href={`/products`}
					className="px-3 mx-auto block w-[200px] text-white py-2 rounded bg-gray-500 text-center">
					{" "}
					View More{" "}
				</Link>
			)}
		</main>
	);
};
export default function Home() {
	return (
		<UserLayout isCheckAuth={false}>
			<Head>
				<title> My Medicine Store</title>
				<meta
					name="description"
					content="Home page, dashboard and manage your orders, products, and more at My Medicine Store."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex min-h-[60vh] items-center justify-center p-4">
				<RenderProducts />
			</div>
		</UserLayout>
	);
}
