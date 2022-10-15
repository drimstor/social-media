import axios from "axios";
import { iFakeUser } from "types/iUsers";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface iState {
  users: iFakeUser[];
  isLoading: boolean;
  error: string;
}

const initialState: iState = {
  users: [],
  isLoading: false,
  error: "",
};

export const fetchUsers = createAsyncThunk(
  "fakeUsers/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<iFakeUser[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    } catch (e) {
      return rejectWithValue("Something is wrong");
    }
  }
);

const fakeUsersSlice = createSlice({
  name: "fakeUsers",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled.type]: (
      state,
      action: PayloadAction<iFakeUser[]>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
    },
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },

    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default fakeUsersSlice.reducer;
