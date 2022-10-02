import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import sideBarSlice from "./slices/sideBarSlice";

const saveToLocalStorage = (state: any) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem("state");
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromLocalStorage();

export const rootReducer = combineReducers({
  user: userSlice,
  sidebar: sideBarSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
})