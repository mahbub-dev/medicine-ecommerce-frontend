import OrderConfirmationCard from "@/components/common/orderConfirmationCard";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Confirmed order</title>
				<meta name="description" content="your order is confirmed" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main
				className={`flex min-h-screen items-center justify-center p-4 ${inter.className}`}>
				<OrderConfirmationCard />
			</main>
		</>
	);
}
