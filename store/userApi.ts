// store/userApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  role: 'super admin' | 'admin' | 'user';
  isEmailVerified: boolean;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }), // Adjust the base URL as needed
  endpoints: (builder) => ({
    getUsers: builder.query<{ users: IUser[]; total: number }, { page: number; limit: number }>({
      query: ({ page, limit }) => `users?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
