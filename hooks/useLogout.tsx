// store/hooks/useLogout.ts
import { useLogoutMutation } from "@/store/apis/authApi";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const useLogout = () => {
	const dispatch = useDispatch();
	const token = useSelector((slice: any) => slice.auth.refreshToken);
	const router = useRouter();
	const [logoutFromServer] = useLogoutMutation();
	const handleLogout  = useCallback(async () => {
		try {
			const res = await logoutFromServer({ token }).unwrap();
			dispatch(logout());
			toast.success(res.message);
		} catch (error: any) {
			toast.error(error.data.message || "Something went wrong");
		}
		router.push("/auth/login");
	}, [dispatch, logoutFromServer, router, token]);

	return handleLogout;
};

export default useLogout;
