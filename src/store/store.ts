import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import sideBarSlice from "./slices/sideBarSlice";
import storage from "redux-persist/lib/storage";
import fakeUsersSllice from "./slices/fakeUsersSllice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["fakeUsers"],
};

export const rootReducer = combineReducers({
  user: userSlice,
  sidebar: sideBarSlice,
  fakeUsers: fakeUsersSllice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
