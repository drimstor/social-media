import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { iAddPost, iComment, iPost } from "types/iPost";

export const postsAPI = createApi({
  reducerPath: "postsAPI",
  tagTypes: ["Posts", "Comments"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/posts" }),
  endpoints: (build) => ({
    getPosts: build.query<iPost[], number>({
      query: (limit: number = 5) => ({
        url: "",
        // params: {
        //   _limit: limit,
        // },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      // transformErrorResponse: (error) => {
      //   const localError = error;
      //   return error?.data.message;
      // },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts" as const, id })),
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
      invalidatesTags: ["Posts"],
    }),
    deletePost: build.mutation<iPost, number>({
      query: (id) => ({
        url: "",
        method: "DELETE",
        body: id,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: build.mutation<iPost, iPost>({
      query: (body) => ({
        url: `/${body.id}`,
        method: "PUT",
        body,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
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
