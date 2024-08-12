import { RootState } from "@/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthLayout = ({ children }: any) => {
	const user = useSelector((state: RootState) => state.auth.user);
	const router = useRouter();
	useEffect(() => {
		if (user) {
			user.role === "admin" && router.push("/admin/users");
			user.role === "super-admin" && router.push("/super-admin");
			user.role === "user" && router.push("/");
		}
	}, [user, router]);
	if (user) {
		return <></>;
	}
	return children;
};

export default AuthLayout;
