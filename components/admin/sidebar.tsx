import useLogout from "@/hooks/useLogout"; // Assuming you have this custom hook for logout
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
	FaBox,
	FaListAlt,
	FaShoppingCart,
	FaSignOutAlt,
	FaUsers,
} from "react-icons/fa"; // Importing FontAwesome icons
import { useSelector } from "react-redux";
const inter = Inter({ subsets: ["latin"] });
const Sidebar = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const router = useRouter();
	const { pathname } = router;
	const logout = useLogout();
	const user = useSelector((state: any) => state.auth.user);
	const linkClasses = (path: string) => {
		const baseClasses =
			"flex items-center gap-2 px-6 py-3 hover:bg-black hover:cursor-pointer text-white cursor rounded-lg transition-colors duration-200";
		const activeClasses = "bg-black text-white";
		const inactiveClasses = "";
		return pathname === path
			? `${baseClasses} ${activeClasses}`
			: `${baseClasses} ${inactiveClasses}`;
	};
	const isSuperAdmin = pathname?.includes("super-admin");
	return (
		<div
			className={`flex h-screen  ${inter.className} ${
				isSidebarOpen ? "w-80" : "w-20"
			} transition-all duration-300 ease-in-out bg-gray-800 text-white`}>
			{/* Sidebar */}
			<div className="flex flex-col relative justify-between h-full w-full">
				<div className="p-4">
					{/* Logo */}
					<div className="flex items-center justify-center py-4">
						<Image
							src={user.photo}
							alt="Medical.io"
							className="h-10 w-10 rounded-full"
							width={50}
							height={50}
						/>
						{isSidebarOpen && (
							<Link
								href={"/"}
								className="text-xl font-semibold ml-3">
								MediStore
							</Link>
						)}
					</div>

					{/* Sidebar Links */}
					<div className="sidebar-links space-y-1">
						{isSuperAdmin && (
							<div>
								<Link
									className={linkClasses("/super-admin")}
									href="/super-admin">
									<FaUsers />
									<span>Users</span>
								</Link>
							</div>
						)}
						{!isSuperAdmin && (
							<>
								<div>
									<Link
										className={linkClasses("/admin/users")}
										href="/admin/users">
										<FaUsers />
										<span>Users</span>
									</Link>
								</div>
								<div>
									<Link
										className={linkClasses(
											"/admin/products"
										)}
										href="/admin/products">
										<FaBox />
										<span>Products</span>
									</Link>
								</div>
								<div>
									<Link
										className={linkClasses("/admin/orders")}
										href="/admin/orders">
										<FaShoppingCart />
										<span>Orders</span>
									</Link>
								</div>
								<div>
									<Link
										className={linkClasses(
											"/admin/categories"
										)}
										href="/admin/categories">
										<FaListAlt />
										<span>Categories</span>
									</Link>
								</div>
							</>
						)}
					</div>

					{/* Logout */}
					<button
						onClick={logout}
						className="flex items-center space-x-2 absolute bottom-32 hover:bg-orange-500 px-6 py-3 w-[86%] rounded">
						<FaSignOutAlt />
						<span>Logout</span>
					</button>

					{/* User Profile */}
					<div className="flex items-center space-x-2 absolute bottom-10 bg-orange-500 px-6 py-3 w-[86%] rounded ">
						<Image
							src={user.photo}
							alt="User Profile"
							className="h-8 w-8 rounded-full"
							width={32}
							height={32}
						/>
						<span className="font-medium">{user.name}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
