import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iUserState } from "types/iUser";

const initialState: iUserState = {
  displayName: "",
  photoURL: "",
  email: "",
  id: "",
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
      state.displayName = "";
      state.photoURL = "";
      state.email = "";
      state.id = "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
