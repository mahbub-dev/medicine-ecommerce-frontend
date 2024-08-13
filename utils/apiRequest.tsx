import { RootState, store } from "@/store";
import { logout, setAccessToken } from "@/store/authSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import axios from "axios";

const mutex = new Mutex();

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
	await mutex.waitForUnlock();

	let result = await fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}

			return headers;
		},
	})(args, api, extraOptions);

	// If you receive a 401 error, try to refresh the token
	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();

			try {
				const refreshToken = store.getState().auth.refreshToken;
				if (refreshToken) {
					// Attempt to refresh the token
					const refreshResult = await axios.post(
						`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
						{ token: refreshToken }
					);

					if (refreshResult.data) {
						// Store the new tokens
						store.dispatch(
							setAccessToken({
								token: refreshResult.data.accessToken,
							})
						);

						// Retry the original request with the new token
						result = await fetchBaseQuery({
							baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
							prepareHeaders: (headers) => {
								headers.set(
									"Authorization",
									`Bearer ${refreshResult.data.accessToken}`
								);
								return headers;
							},
						})(args, api, extraOptions);
					}
				} else {
					// No refresh token available, log out
					store.dispatch(logout());
					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");
					window.location.href = "/auth/login";
				}
			} catch (error: any) {
				if (
					error?.response?.data?.message === "Invalid refresh token" &&
					error?.response?.data?.statusCode === 403
				) {
					console.error(error)
					store.dispatch(logout());
					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");
					window.location.href = "/auth/login";
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await fetchBaseQuery({
				baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
				prepareHeaders: (headers, { getState }) => {
					const token =
						(getState() as RootState).auth.token ||
						localStorage.getItem("accessToken");

					if (token) {
						headers.set("Authorization", `Bearer ${token}`);
					}

					return headers;
				},
			})(args, api, extraOptions);
		}
	}

	return result;
};

export default baseQueryWithReauth;
