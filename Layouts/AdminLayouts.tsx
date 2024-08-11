import Sidebar from "@/components/admin/sidebar";
import { useState } from "react";

const DashboardLayout = ({ children }: any) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

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
