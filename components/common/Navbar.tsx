import useLogout from "@/hooks/useLogout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const user = useSelector((state: any) => state.auth.user); // Replace with your actual authentication logic
	const userName = user?.name;
	const isLoggedIn = !!user;
	const handleLogout = useLogout();
	const router = useRouter();
	const currentPath = router.pathname;

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const getLinkClassName = (path: string) =>
		`block py-2 px-4 rounded hover:underline ${
			currentPath === path ? "bg-gray-600" : ""
		}`;

	return (
		<nav className="bg-gray-800 text-white">
			<div className="container mx-auto px-4 py-3 flex justify-between items-center">
				<div className="flex items-center">
					<Link href="/">
						<span className="text-2xl font-bold">MediStore</span>
					</Link>
				</div>
				<div className="hidden md:flex space-x-4">
					<Link href="/" className={getLinkClassName("/")}>
						Home
					</Link>
					<Link
						href="/products"
						className={getLinkClassName("/products")}>
						Products
					</Link>
					{isLoggedIn && (
						<Link
							href="/orders"
							className={getLinkClassName("/orders")}>
							My Orders
						</Link>
					)}

					{isLoggedIn ? (
						<button onClick={handleLogout} className="text-white">
							Logout
						</button>
					) : (
						<Link
							href="/auth/login"
							className={getLinkClassName("/auth/login")}>
							Login
						</Link>
					)}
				</div>
				<div className="hidden md:flex items-center space-x-4">
					{isLoggedIn && (
						<div className="flex items-center gap-2">
							<Image
							title={'user photo'}
								src={user?.photo}
								alt="User Photo"
								width={50}
								height={50}
								className="rounded-full border"
							/>
							<span className="block">{userName}</span>
						</div>
					)}
				</div>
				<div className="md:hidden">
					<button
						onClick={toggleMenu}
						className="text-white focus:outline-none">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16m-7 6h7"></path>
						</svg>
					</button>
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden bg-gray-700">
					<div className="space-y-2 p-4">
						<Link href="/" className={getLinkClassName("/")}>
							Home
						</Link>
						<Link
							href="/products"
							className={getLinkClassName("/products")}>
							Products
						</Link>
						<Link
							href="/about"
							className={getLinkClassName("/about")}>
							About
						</Link>
						<Link
							href="/contact"
							className={getLinkClassName("/contact")}>
							Contact
						</Link>
						{isLoggedIn ? (
							<>
								<Link
									href="/profile"
									className={getLinkClassName("/profile")}>
									{userName}
								</Link>
								<button
									onClick={handleLogout}
									className="text-red-500 hover:underline block">
									Logout
								</button>
							</>
						) : (
							<Link
								href="/login"
								className={getLinkClassName("/login")}>
								Login
							</Link>
						)}
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
