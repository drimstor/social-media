import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { iLoginUser, iUserState } from "types/iUser";
import { API_URL, DEV_API_URL } from "config";
import { setShowSnackbar } from "./messageSlice";

const initialState: iUserState = {
  name: "",
  avatar: "",
  email: "",
  id: "",
  token: "",
  posts: undefined,
};

// ------------ Async Reducers ------------- //

export const registration = createAsyncThunk(
  "user/registration",
  async (data: iLoginUser, { dispatch }) => {
    try {
      const response = await axios.post(
        `${API_URL}api/auth/registration`,
        data
      );
      dispatch(
        setShowSnackbar({
          variant: "success",
          message: "User created",
        })
      );
      return response.data;
    } catch (error: any) {
      return dispatch(
        setShowSnackbar({
          variant: "fail",
          message: error.response.data.message,
        })
      );
    }
  }
);

// -------------------------- //

export const login = createAsyncThunk(
  "user/login",
  async (data: Omit<iLoginUser, "name" | "file">, { dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}api/auth/login`, {
        email: data.email,
        password: data.password,
      });
      dispatch(
        setShowSnackbar({
          variant: "success",
          message: "Welcome!",
        })
      );
      return response.data;
    } catch (error: any) {
      return dispatch(
        setShowSnackbar({
          variant: "fail",
          message: error.response.data.message,
        })
      );
    }
  }
);

// -------------------------- //

export const auth = createAsyncThunk(
  "user/auth",
  async (token: string, { dispatch }) => {
    try {
      const response = await axios.get(`${API_URL}api/auth/auth`, {
        headers: {
          Authorization: `Bearer ${token ?? localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return dispatch(logout());
    }
  }
);

// -------------------------- //

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (file: any, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${API_URL}api/files/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return dispatch(
        setShowSnackbar({
          variant: "fail",
          message: error.response.data.message,
        })
      );
    }
  }
);

// -------------------------- //

export const deleteAvatar = createAsyncThunk(
  "user/deleteAvatar",
  async (_, { dispatch }) => {
    try {
      const response = await axios.delete(`${API_URL}api/files/avatar`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return dispatch(
        setShowSnackbar({
          variant: "fail",
          message: error.response.data.message,
        })
      );
    }
  }
);

// -------------------------- //

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.name = "";
      state.avatar = "";
      state.email = "";
      state.id = "";
      state.token = "";
      state.posts = undefined;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.user.name;
      state.avatar = action.payload.user.avatar;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      state.posts = action.payload.user.posts;
      localStorage.setItem("token", action.payload.token);
    });

    // -------------------------- //

    builder.addCase(auth.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.user.name;
      state.avatar = action.payload.user.avatar;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      state.posts = action.payload.user.posts;
      localStorage.setItem("token", action.payload.token);
    });

    // -------------------------- //

    builder.addCase(registration.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.user.name;
      state.avatar = action.payload.user.avatar;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      state.posts = action.payload.user.posts;
      localStorage.setItem("token", action.payload.token);
    });

    // -------------------------- //

    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.user.name;
      state.avatar = action.payload.user.avatar;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      state.posts = action.payload.user.posts;
    });

    // -------------------------- //

    builder.addCase(deleteAvatar.fulfilled, (state, action: any) => {
      state.token = action.payload.token;
      state.name = action.payload.user.name;
      state.avatar = action.payload.user.avatar;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      state.posts = action.payload.user.posts;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
