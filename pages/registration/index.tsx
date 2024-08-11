import Registration from "@/components/auth/Registration";
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
const Index = () => {
	return (
		<>
			<Head>
				<title>Register - My Medicine Store</title>
				<meta name="description" content="Create a new account at My Medicine Store to manage your orders, products, and more. Join us today!" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`flex min-h-screen items-center justify-center p-4 ${inter.className}`}>
				<Registration />
			</main>
		</>
	);
};

export default Index;
