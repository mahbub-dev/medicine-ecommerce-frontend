import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { authApi } from "./authApi";
import authReducer from "./authSlice"; // Import the authSlice
import cartReducer from "./cartSlice";
import { categoryApi } from "./categoryApi";
import { orderApi } from "./orderApi";
import { productApi } from "./productApi";
import { shippingApi } from "./shippingApi";
import { userApi } from "./userApi";
import { variantApi } from "./variantApi";

const rootReducer = combineReducers({
	auth: authReducer, // Add the authSlice here
	cart: cartReducer, // Add the authSlice here
	[userApi.reducerPath]: userApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[categoryApi.reducerPath]: categoryApi.reducer,
	[productApi.reducerPath]: productApi.reducer,
	[variantApi.reducerPath]: variantApi.reducer,
	[shippingApi.reducerPath]: shippingApi.reducer,
	[orderApi.reducerPath]: orderApi.reducer,
	// Add other reducers here
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: [
		"auth",
		"cart",
		userApi.reducerPath,
		authApi.reducerPath,
		categoryApi.reducerPath,
		productApi.reducerPath,
		variantApi.reducerPath,
		shippingApi.reducerPath,
		orderApi.reducerPath,
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
			productApi.middleware,
			shippingApi.middleware,
			variantApi.middleware,
			orderApi.middleware
		), // Include both userApi and authApi middlewares
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
