import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthLayout = ({ children }: any) => {
	const user = useSelector((state: RootState) => state.auth.user);
	const router = useRouter();
	const redirect = router.query?.redirect;
	useEffect(() => {
		if (!redirect && user) {
			user.role === "admin" && router.push("/admin/users");
			user.role === "super-admin" && router.push("/super-admin");
			user.role === "user" && router.push("/");
		}
	}, [user, router, redirect]);
	if (user) {
		return <></>;
	}
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
};

export default AuthLayout;
