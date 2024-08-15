import ProductsByCategory from "@/components/productPage/relatedProductPage";
import UserLayout from "@/Layouts/UserLayout";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Index({ params }: any) {
	return (
		<UserLayout isCheckAuth={false}>
			<Head>
				<title> My Medicine Store</title>
				<meta
					name="description"
					content="Login to your account to access your dashboard and manage your orders, products, and more at My Medicine Store."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`mx-auto container`}>
				<ProductsByCategory />
			</main>
		</UserLayout>
	);
}
