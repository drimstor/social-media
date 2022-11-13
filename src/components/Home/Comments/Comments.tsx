import React from "react";
import { useGetCommentsQuery } from "store/API/postsAPI";

import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { iPost } from "types/iPost";
import clsx from "clsx";

function Comments({ post }: { post: iPost }) {
  const { data, isLoading } = useGetCommentsQuery([9, post.id]);

  return (
    <>
      <div className={s.comments}>
        {data &&
          data.map((comment) => <Comment key={comment.id} comment={comment} />)}
      </div>
      {data && data.length > 0 && (
        <div className={clsx(s.divider, s.lastDivider)} />
      )}
      <AddComment post={post} />
    </>
  );
}

export default Comments;
