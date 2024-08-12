import Sidebar from "@/components/admin/sidebar";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashboardLayout = ({ children }: any) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const router = useRouter();
	const user = useSelector((state: any) => state.auth.user);
	useEffect(() => {
		if (user?.role !== "admin") {
			router.push("/auth/login");
		}
	}, [router, user?.role]);
	// const toggleSidebar = () => {
	// 	setSidebarOpen(!isSidebarOpen);
	// };
	if (user?.role !== "admin") {
		return <></>;
	}
	return (
		<>
			{/* <Navbar /> */}
			<div className="flex min-h-screen bg-gray-100 ">
				<Sidebar />
				<div className="flex-1 flex w-full flex-col">
					<main className="flex-1  overflow-y-auto p-8 bg-gray-50">
						{children}
					</main>
				</div>
			</div>
		</>
	);
};

export default DashboardLayout;
