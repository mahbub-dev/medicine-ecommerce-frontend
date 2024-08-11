import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { authApi } from "./authApi";
import { userApi } from "./userApi";

const rootReducer = combineReducers({
	[userApi.reducerPath]: userApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	// Add other reducers here
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: [userApi.reducerPath, authApi.reducerPath], // Specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Required due to redux-persist usage
		}).concat(userApi.middleware, authApi.middleware), // Include both userApi and authApi middlewares
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
