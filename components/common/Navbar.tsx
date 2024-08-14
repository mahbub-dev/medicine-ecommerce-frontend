// components/Navbar.tsx
import useLogout from "@/hooks/useLogout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const user = useSelector((state: any) => state.auth.user); // Replace with your actual authentication logic
	const userName = user?.name;
	const isLoggedIn = !!user;
	const  handleLogout  = useLogout();
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};



	return (
		<nav className="bg-gray-800 text-white">
			<div className="container mx-auto px-4 py-3 flex justify-between items-center">
				<div className="flex items-center">
					<Link href="/">
						<span className="text-2xl font-bold">MediStore</span>
					</Link>
				</div>
				<div className="hidden md:flex space-x-4">
					<Link href="/">
						<span className="hover:underline">Home</span>
					</Link>
					<Link href="/products">
						<span className="hover:underline">Products</span>
					</Link>
					{isLoggedIn && (
						<Link href="/orders">
							<span className="hover:underline">My Orders</span>
						</Link>
					)}

					{/* <Link href="/contact">
						<span className="hover:underline">Contact</span>
					</Link> */}
					<button onClick={handleLogout} className="text-white ">
						Logout
					</button>
				</div>

				<div className="hidden md:flex items-center space-x-4">
					{isLoggedIn ? (
						<div className="flex items-center gap-2">
							<Image
								src={user?.photo}
								alt="User Photo"
								width={50}
								height={50}
								className="rounded-full border"
							/>
							<span className="block">{userName}</span>
						</div>
					) : (
						<Link href="/login">
							<span className="hover:underline">Login</span>
						</Link>
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
						<Link href="/">
							<span className="block hover:underline">Home</span>
						</Link>
						<Link href="/products">
							<span className="block hover:underline">
								Products
							</span>
						</Link>
						<Link href="/about">
							<span className="block hover:underline">About</span>
						</Link>
						<Link href="/contact">
							<span className="block hover:underline">
								Contact
							</span>
						</Link>
						{isLoggedIn ? (
							<>
								<Link href="/profile">
									<span className="block hover:underline">
										{userName}
									</span>
								</Link>
								<button
									onClick={handleLogout}
									className="text-red-500 hover:underline block">
									Logout
								</button>
							</>
						) : (
							<Link href="/login">
								<span className="block hover:underline">
									Login
								</span>
							</Link>
						)}
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
