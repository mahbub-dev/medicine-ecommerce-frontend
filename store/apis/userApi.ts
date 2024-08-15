// store/userApi.ts
import baseQueryWithReauth from "@/utils/apiRequest";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface IUser {
	_id: string;
	name: string;
	email: string;
	password: string;
	photo: string;
	role: "super-admin" | "admin" | "user";
	isEmailVerified: boolean;
}

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["UserList"],
	endpoints: (builder) => ({
		getUsers: builder.query<
			{ users: IUser[]; total: number; totalPages: number },
			{ page: number; limit: number }
		>({
			query: ({ page, limit }) => `users?page=${page}&limit=${limit}`,
			providesTags: ["UserList"], // Provide a tag for cache invalidation
		}),
		updateUserRole: builder.mutation<
			void,
			{
				userId: string;
				newRole: "super-admin" | "admin" | "user" | string;
			}
		>({
			query: ({ userId, newRole }) => ({
				url: `users/update-role/${userId}`,
				method: "PUT",
				body: { role: newRole },
			}),
			invalidatesTags: ["UserList"], // Invalidate the cache for the user list
		}),
	}),
});

export const { useGetUsersQuery, useUpdateUserRoleMutation } = userApi;
