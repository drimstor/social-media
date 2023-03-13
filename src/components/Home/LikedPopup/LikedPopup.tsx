import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useAppSelector } from "hooks/redux";
import React from "react";
import s from "./LikedPopup.module.scss";

import img from "img/ZC5B45PbR1I.jpg";
import ToolTip from "components/Helpers/ToolTip";
import clsx from "clsx";

function LikedPopup({ likes, isShow }: { likes: string[]; isShow: boolean }) {
  const user = useAppSelector((state) => state.user);

  const likesValue = likes.length < 5 ? likes : likes.slice(-3);

  return (
    <div
      className={clsx(s.likedWrapper, isShow && likes.length !== 0 && s.show)}
    >
      {likes &&
        likesValue.map((like) => (
          <ToolTip reverse title={user.displayName}>
            <img src={img} alt="" />
          </ToolTip>
        ))}
      {likes.length > 4 && (
        <ToolTip reverse title={"See more"}>
          <span className={s.moreLikes}>+{likes.length - 3}</span>
        </ToolTip>
      )}
    </div>
  );
}

export default LikedPopup;
