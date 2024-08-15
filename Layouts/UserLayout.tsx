import { useRouter } from "next/router";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });
const UserLayout = ({ children, isCheckAuth = true }: any) => {
	const router = useRouter();
	const user = useSelector((state: any) => state.auth.user);
	useEffect(() => {
		if (isCheckAuth) {
			if (user?.role !== "user") {
				router.push(`/auth/login?redirect=${router.pathname}`);
			}
		}
	}, [isCheckAuth, router, user?.role]);

	if (isCheckAuth && user?.role !== "user") {
		return <></>;
	}
	return (
		<>
			{/* <Navbar /> */}
			<Navbar />
			<div className="  bg-gray-100  ">
				<div
					className={` w-full ${inter.className}`}
					// style={{ overflow: "hidden" }}
				>
					<main
						// style={{ overflowY: "auto" }}
						className="flex-1 p-8 bg-gray-50">
						{children}
					</main>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default UserLayout;
