import Sidebar from "@/components/admin/sidebar";
import { useRouter } from "next/router";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });
const SuperAdminLayout = ({ children }: any) => {
	const router = useRouter();
	const user = useSelector((state: any) => state.auth.user);
	useEffect(() => {
		if (user?.role !== "super-admin") {
			router.push("/auth/login");
		}
	}, [router, user?.role]);
	// const toggleSidebar = () => {
	// 	setSidebarOpen(!isSidebarOpen);
	// };
	if (user?.role !== "super-admin") {
		return <></>;
	}
	return (
		<>
			{/* <Navbar /> */}
			<div className="flex  h-screen  bg-gray-100  ">
				<Sidebar />
				<div
					className={`flex-1 flex w-full flex-col ${inter.className}`}
					style={{ overflow: "hidden" }}>
					<main
						style={{ overflowY: "auto" }}
						className="flex-1 p-8 bg-gray-50">
						{children}
					</main>
				</div>
			</div>
		</>
	);
};

export default SuperAdminLayout;
