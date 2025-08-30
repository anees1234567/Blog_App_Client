import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "post"], // choose which slices you want to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
