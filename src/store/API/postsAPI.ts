import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setShowSnackbar } from "store/slices/messageSlice";
import { iAddPost, iComment, iPost } from "types/iPost";

export const postsAPI = createApi({
  reducerPath: "postsAPI",
  tagTypes: ["Posts", "Comments"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/posts" }),
  endpoints: (build) => ({
    getPosts: build.query<iPost[], number>({
      query: (limit: number = 5) => ({
        url: "",
        params: { limit, sort: -1 },
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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Posts" as const, _id })),
              "Posts",
            ]
          : ["Posts"],
    }),
    addPost: build.mutation<iAddPost, FormData>({
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
      invalidatesTags: ["Posts"],
    }),
    deletePost: build.mutation<iAddPost, number>({
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
      invalidatesTags: ["Posts"],
    }),
    updatePost: build.mutation<iAddPost, { text: string; id: string }>({
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
      invalidatesTags: ["Posts"],
    }),
    /* ------------------------------------------------------- */
    getComments: build.query<iComment[], number[]>({
      query: (filter: number[]) =>
        `/comments?${`_limit=${filter[0]}&postId=${filter[1]}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comments" as const, id })),
              "Comments",
            ]
          : ["Comments"],
    }),
    addComment: build.mutation<iComment, iComment>({
      query: (body) => ({
        url: `/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: build.mutation<iComment, number>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
    updateComment: build.mutation<iComment, iComment>({
      query: (body) => ({
        url: `/comments/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useUpdatePostMutation,
} = postsAPI;
