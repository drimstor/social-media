import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import sideBarSlice from "./slices/sideBarSlice";
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
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["sidebar"],
};

export const rootReducer = combineReducers({
  user: userSlice,
  sidebar: sideBarSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

// const saveToLocalStorage = (state: any) => {
//   try {
//     localStorage.setItem("state", JSON.stringify(state));
//   } catch (e) {
//     console.error(e);
//   }
// };

// const loadFromLocalStorage = () => {
//   try {
//     const stateStr = localStorage.getItem("state");
//     return stateStr ? JSON.parse(stateStr) : undefined;
//   } catch (e) {
//     console.error(e);
//     return undefined;
//   }
// };

// store.subscribe(() => {
//   saveToLocalStorage(store.getState());
// })
