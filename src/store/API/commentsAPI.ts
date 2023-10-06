import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, DEV_API_URL } from "config";
import { setShowSnackbar } from "store/slices/messageSlice";
import { iAddPost, iComment } from "types/iPost";

export const commentsAPI = createApi({
  reducerPath: "commentsAPI",
  tagTypes: ["Comment"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}api/comments`,
  }),
  endpoints: (build) => ({
    getComments: build.query<iComment[], any[]>({
      query: (limit: any[]) => ({
        url: "",
        params: { limit: limit[0], postId: String(limit[1]) },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Comment" as const, _id })),
              "Comment",
            ]
          : ["Comment"],
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

    addComment: build.mutation<iAddPost, FormData>({
      query: (body) => ({
        url: `/add`,
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
      invalidatesTags: ["Comment"],
    }),
    deleteComment: build.mutation<iAddPost, string>({
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
      invalidatesTags: ["Comment"],
    }),
    updateComment: build.mutation<iAddPost, { text: string; id: string }>({
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
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentsAPI;
