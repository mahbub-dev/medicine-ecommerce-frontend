import Login from "@/components/auth/Login";
import AuthLayout from "@/Layouts/AuthLayout";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
	return (
		<>
			<Head>
				<title>Login - My Medicine Store</title>
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
			<AuthLayout>
				<main
					className={`flex min-h-screen items-center justify-center p-4 ${inter.className}`}>
					<Login />
				</main>
			</AuthLayout>
		</>
	);
}
