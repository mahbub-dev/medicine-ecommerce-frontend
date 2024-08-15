// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	token: string | null;
	refreshToken: string | null;
	user: any | null; // Adjust type based on your user model
}

const initialState: AuthState = {
	token: "",
	refreshToken: "",
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (
			state,
			action: PayloadAction<{
				token: string;
				refreshToken: string;
				user: any;
			}>
		) => {
			state.token = action.payload.token;
			state.refreshToken = action.payload.refreshToken;
			state.user = action.payload.user;
			localStorage.setItem("accessToken", action.payload.token);
			localStorage.setItem("refreshToken", action.payload.refreshToken);
		},
		setAccessToken: (
			state,
			action: PayloadAction<{
				token: string;
			}>
		) => {
			state.token = action.payload.token;
		},

		logout: (state) => {
			state.token = null;
			state.refreshToken = null;
			state.user = null;
			localStorage.clear()
		},
	},
});

export const { setCredentials, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
