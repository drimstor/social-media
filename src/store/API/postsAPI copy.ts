import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { iComment, iPost } from "types/iPost";

export const postsAPI = createApi({
  reducerPath: "postsAPI",
  tagTypes: ["Posts", "Comments"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (build) => ({
    getPosts: build.query<iPost[], number>({
      query: (limit: number = 5) => ({
        url: `/posts`,
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Posts" as const, _id })),
              "Posts",
            ]
          : ["Posts"],
    }),
    addPost: build.mutation<iPost, iPost>({
      query: (body) => ({
        url: `/posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: build.mutation<iPost, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: build.mutation<iPost, iPost>({
      query: (body) => ({
        url: `/posts/${body._id}`,
        method: "PUT",
        body,
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
