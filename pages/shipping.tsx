import ShippingComponent from "@/components/shipping/shipping"; // Replace with the actual path to your shipping component
import UserLayout from "@/Layouts/UserLayout";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<UserLayout>
			<Head>
				<title>My Medicine Store | Your Trusted Pharmacy</title>
				<meta
					name="description"
					content="Welcome to My Medicine Store. Explore a wide range of medicines and health products. Manage your orders, update shipping addresses, and more. Your health is our priority."
				/>
				<meta
					name="keywords"
					content="medicine, pharmacy, health products, online pharmacy, manage orders, update shipping address"
				/>
				<meta name="author" content="My Medicine Store" />
				<meta
					property="og:title"
					content="My Medicine Store | Your Trusted Pharmacy"
				/>
				<meta
					property="og:description"
					content="Welcome to My Medicine Store. Explore a wide range of medicines and health products. Manage your orders, update shipping addresses, and more. Your health is our priority."
				/>
				<meta
					property="og:image"
					content="/images/og-image.jpg" // Replace with your actual Open Graph image URL
				/>
				<meta
					property="og:url"
					content="https://www.mymedicinestore.com" // Replace with your actual site URL
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="canonical"
					href="https://www.mymedicinestore.com"
				/>{" "}
				{/* Replace with your actual canonical URL */}
			</Head>
			<main
				className={`flex min-h-screen items-center justify-center p-4 ${inter.className}`}>
				<ShippingComponent />
			</main>
		</UserLayout>
	);
}
