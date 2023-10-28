import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DEV_API_URL } from "config";
import { setShowSnackbar } from "store/slices/messageSlice";
import { iMessage } from "types/iMessage";
import { iAddPost } from "types/iPost";
import { iChat, iUser } from "types/iUser";

export const chatApi = createApi({
  reducerPath: "chatApi",
  tagTypes: ["Messages", "PreviewChats"],
  baseQuery: fetchBaseQuery({ baseUrl: `${DEV_API_URL}api/messages` }),
  endpoints: (build) => ({
    // Sidebar Preview
    searchUser: build.query<iUser[], any>({
      query: (name: string) => ({
        url: "/users-preview-search",
        params: {
          name: name,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      transformErrorResponse: (error) => {
        const localError: { message: string } | any = error.data;
        if ("message" in localError) return localError.message;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          if ("error" in err) {
            dispatch(
              setShowSnackbar({
                variant: "fail",
                message: err?.error,
              })
            );
          }
        }
      },
    }),
    getUsersPreview: build.query<iChat[], string>({
      query: () => ({
        url: "/users-preview",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      transformErrorResponse: (error) => {
        const localError: { message: string } | any = error.data;
        if ("message" in localError) return localError.message;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          if ("error" in err) {
            dispatch(
              setShowSnackbar({
                variant: "fail",
                message: err?.error,
              })
            );
          }
        }
      },
      providesTags: ["PreviewChats"],
    }),
    setUsersPreview: build.mutation<any, any>({
      query: (body: { senderId: string; recipientId: string }) => ({
        url: "/users-preview",
        method: "POST",
        body,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      transformErrorResponse: (error) => {
        const localError: { message: string } | any = error.data;
        if ("message" in localError) return localError.message;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          if ("error" in err) {
            dispatch(
              setShowSnackbar({
                variant: "fail",
                message: err?.error,
              })
            );
          }
        }
      },
      invalidatesTags: ["PreviewChats"],
    }),
    changeUsersPreview: build.mutation<any, any>({
      query: (body: {
        senderId: string;
        recipientId: string;
        text: string;
      }) => ({
        url: "/users-preview",
        method: "PUT",
        body,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      transformErrorResponse: (error) => {
        const localError: { message: string } | any = error.data;
        if ("message" in localError) return localError.message;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          if ("error" in err) {
            dispatch(
              setShowSnackbar({
                variant: "fail",
                message: err?.error,
              })
            );
          }
        }
      },
      invalidatesTags: ["PreviewChats"],
    }),

    // Messages
    getMessages: build.query<iMessage[], any>({
      query: (body: {
        limit: number;
        senderId: string;
        recipientId: string;
      }) => ({
        url: "",
        params: {
          limit: body.limit,
          senderId: body.senderId,
          recipientId: body.recipientId,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      transformErrorResponse: (error) => {
        const localError: { message: string } | any = error.data;
        if ("message" in localError) return localError.message;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          if ("error" in err) {
            dispatch(
              setShowSnackbar({
                variant: "fail",
                message: err?.error,
              })
            );
          }
        }
      },
      providesTags: ["Messages", "PreviewChats"],
    }),
    sendMessage: build.mutation<iAddPost, FormData>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      transformErrorResponse: (error) => {
        const localError: { message: string } | any = error.data;
        if ("message" in localError) return localError.message;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled.then((data) => {
            dispatch(
              setShowSnackbar({
                variant: "success",
                message: data.data.message,
              })
            );
          });
        } catch (err: any) {
          if ("error" in err) {
            dispatch(
              setShowSnackbar({
                variant: "fail",
                message: err?.error,
              })
            );
          }
        }
      },
      invalidatesTags: ["Messages", "PreviewChats"],
    }),
    deleteMessage: build.mutation<iAddPost, string>({
      query: (id) => ({
        url: "",
        method: "DELETE",
        params: { id },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      transformErrorResponse: (error) => {
        const localError: { message: string } | any = error.data;
        if ("message" in localError) return localError.message;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled.then((data) => {
            dispatch(
              setShowSnackbar({
                variant: "success",
                message: data.data.message,
              })
            );
          });
        } catch (err: any) {
          if ("error" in err) {
            dispatch(
              setShowSnackbar({
                variant: "fail",
                message: err?.error,
              })
            );
          }
        }
      },
      invalidatesTags: ["Messages"],
    }),
    updateMessage: build.mutation<iAddPost, { text: string; id: string }>({
      query: (body) => ({
        url: "",
        method: "PUT",
        params: { id: body.id },
        body,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      transformErrorResponse: (error) => {
        const localError: { message: string } | any = error.data;
        if ("message" in localError) return localError.message;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled.then((data) => {
            dispatch(
              setShowSnackbar({
                variant: "success",
                message: data.data.message,
              })
            );
          });
        } catch (err: any) {
          if ("error" in err) {
            dispatch(
              setShowSnackbar({
                variant: "fail",
                message: err?.error,
              })
            );
          }
        }
      },
      invalidatesTags: ["Messages"],
    }),
    /* ------------------------------------------------------- */
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
  useUpdateMessageMutation,
  useGetUsersPreviewQuery,
  useSetUsersPreviewMutation,
  useChangeUsersPreviewMutation,
  useLazySearchUserQuery,
} = chatApi;
