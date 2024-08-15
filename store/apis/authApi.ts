// store/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`,
	}), // Adjust your base URL
	endpoints: (builder) => ({
		// Mutation for user registration
		register: builder.mutation<
			{
				user: any;
				message: string;
				success: boolean;
			},
			FormData
		>({
			query: (formData) => ({
				url: "register",
				method: "POST",
				body: formData,
			}),
		}),
		// Mutation for otp verification
		verifyOtp: builder.mutation<
			{ success: boolean },
			{ otp: string; email: string }
		>({
			query: ({ otp, email }) => ({
				url: `verify-email`,
				method: "POST",
				body: { otp, email },
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
		// Mutation for resend otp
		resendOtp: builder.mutation<{ success: boolean }, { email: string }>({
			query: ({ email }) => ({
				url: `resend-otp`,
				method: "POST",
				body: { email },
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),

		// Mutation for login
		login: builder.mutation<
			{
				accessToken: string;
				refreshToken: string;
				user: any;
			},
			{ email: string; password: string }
		>({
			query: (credentials) => ({
				url: "login",
				method: "POST",
				body: credentials,
			}),
		}),

		// Mutation for logout
		logout: builder.mutation<
			{
				message: string;
			},
			{}
		>({
			query: ({ refreshToken }: any) => ({
				url: "logout",
				method: "POST",
				body: { refreshToken },
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useVerifyOtpMutation,
	useResendOtpMutation,
	useLoginMutation,
	useLogoutMutation,
} = authApi;
