import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { authApi } from "./authApi";
import authReducer from "./authSlice"; // Import the authSlice
import { categoryApi } from "./categoryApi";
import { productApi } from "./productApi";
import { userApi } from "./userApi";

const rootReducer = combineReducers({
	auth: authReducer, // Add the authSlice here
	[userApi.reducerPath]: userApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[categoryApi.reducerPath]: categoryApi.reducer,
	[productApi.reducerPath]: productApi.reducer,
	// Add other reducers here
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: [
		"auth",
		userApi.reducerPath,
		authApi.reducerPath,
		categoryApi.reducerPath,
		productApi.reducerPath
	], // Include auth in the whitelist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Required due to redux-persist usage
		}).concat(
			userApi.middleware,
			authApi.middleware,
			categoryApi.middleware,
			productApi.middleware
		), // Include both userApi and authApi middlewares
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
