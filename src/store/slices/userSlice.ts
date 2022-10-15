import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iUserState } from "types/iUsers";

const initialState: iUserState = {
  displayName: null,
  photoURL: null,
  email: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<iUserState>) {
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.displayName = null;
      state.photoURL = null;
      state.email = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
