import s from "components/Home/HomeFeed/HomeFeed.module.scss";
import AddComment from "./AddComment";
import Comment from "./Comment";
import clsx from "clsx";
import { useGetCommentsQuery } from "store/API/commentsAPI";

function Comments({ postId }: { postId: string }) {
  const { data, isLoading } = useGetCommentsQuery([9, postId]);

  return (
    <>
      <div className={s.comments}>
        {data &&
          data.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
      </div>
      {data && data.length > 0 && (
        <div className={clsx(s.divider, s.lastDivider)} />
      )}
      <AddComment postId={postId} />
    </>
  );
}

export default Comments;
