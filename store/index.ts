// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { userApi } from './userApi';

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  // Add other reducers here
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [userApi.reducerPath], // Specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required due to redux-persist usage
    }).concat(userApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
