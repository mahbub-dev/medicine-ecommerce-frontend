// pages/orders/[orderId].tsx
import OrderDetailsPage from "@/components/orders/orderDetails";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
export const getServerSideProps = ({ params }: any) => {
	return { props: { params } };
};
export default function Index({ params }: any) {

	const id = params?.id;
	return (
		<>
			<Head>
				<title>Order Details - My Medicine Store</title>
				<meta
					name="description"
					content={`Details of order ${id} at My Medicine Store.`}
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<OrderDetailsPage id={id}/>
			</main>
		</>
	);
}
