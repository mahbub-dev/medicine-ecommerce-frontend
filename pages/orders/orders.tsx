import OrdersPage from "@/components/orders";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
	return (
		<>
			<Head>
				<title>My Orders - My Medicine Store</title>
				<meta
					name="description"
					content="View and manage your orders at My Medicine Store. Check the status and details of all your previous purchases."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<OrdersPage />
			</main>
		</>
	);
}
