// store/userApi.ts
import baseQueryWithReauth from "@/utils/apiRequest";
import { createApi } from "@reduxjs/toolkit/query/react";
export interface IUser extends Document {
	_id: string;
	name: string;
	email: string;
	password: string;
	photo: string;
	role: "super admin" | "admin" | "user";
	isEmailVerified: boolean;
}

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: baseQueryWithReauth, // Adjust the base URL as needed
	endpoints: (builder) => ({
		getUsers: builder.query<
			{ users: IUser[]; total: number },
			{ page: number; limit: number }
		>({
			query: ({ page, limit }) => `users?page=${page}&limit=${limit}`,
		}),
	}),
});

export const { useGetUsersQuery } = userApi;
