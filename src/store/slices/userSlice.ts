import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { iLoginUser, iUserState } from "types/iUser";
import { API_URL } from "config";

const initialState: iUserState = {
  displayName: "",
  photoURL: "",
  email: "",
  id: "",
  token: "",
};

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<iUserState>) {
//       state.displayName = action.payload.displayName;
//       state.photoURL = action.payload.photoURL;
//       state.email = action.payload.email;
//       state.id = action.payload.id;
//     },
//     removeUser(state) {
//       state.displayName = "";
//       state.photoURL = "";
//       state.email = "";
//       state.id = "";
//     },
//   },
// });

// ------------ Async Reducers ------------- //

export const registration = createAsyncThunk(
  "user/registration",
  async (data: iLoginUser, { dispatch }) => {
    try {
      const response = await axios.post(
        `${API_URL}api/auth/registration`,
        data
      );
      // dispatch(
      //   setShowSnackbar({
      //     variant: "success",
      //     message: "User created",
      //   })
      // );
      return response.data;
    } catch (error: any) {
      // return dispatch(
      //   setShowSnackbar({
      //     variant: "fail",
      //     message: error.response.data.message,
      //   })
      // );
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
      // dispatch(
      //   setShowSnackbar({
      //     variant: "success",
      //     message: "Welcome!",
      //   })
      // );
      return response.data;
    } catch (error: any) {
      // return dispatch(
      //   setShowSnackbar({
      //     variant: "fail",
      //     message: error.response.data.message,
      //   })
      // );
    }
  }
);

// -------------------------- //

export const auth = createAsyncThunk("user/auth", async (_) => {
  try {
    const response = await axios.get(`${API_URL}api/auth/auth`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    localStorage.removeItem("token");
  }
});

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
      // return dispatch(
      //   setShowSnackbar({
      //     variant: "fail",
      //     message: error.response.data.message,
      //   })
      // );
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
      // return dispatch(
      //   setShowSnackbar({
      //     variant: "fail",
      //     message: error.response.data.message,
      //   })
      // );
    }
  }
);

// -------------------------- //

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.displayName = "";
      state.photoURL = "";
      state.email = "";
      state.id = "";
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.displayName = action.payload.user.name;
      state.photoURL = action.payload.user.avatar;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      localStorage.setItem("token", action.payload.token);
    });

    // -------------------------- //

    builder.addCase(auth.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.displayName = action.payload.user.name;
      state.photoURL = action.payload.user.avatar;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      localStorage.setItem("token", action.payload.token);
    });

    // -------------------------- //

    builder.addCase(registration.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.displayName = action.payload.user.name;
      state.photoURL = action.payload.user.avatar;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      localStorage.setItem("token", action.payload.token);
    });

    // -------------------------- //

    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.displayName = action.payload.user.name;
      state.photoURL = action.payload.user.avatar;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
    });

    // -------------------------- //

    builder.addCase(deleteAvatar.fulfilled, (state, action: any) => {
      state.token = action.payload.token;
      state.displayName = action.payload.user.name;
      state.photoURL = action.payload.user.avatar;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
