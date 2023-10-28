import React, { useState } from "react";
import s from "./Chat.module.scss";
import ChatNavBar from "./ChatNavBar";
import ChatsUser from "./ChatsUser";
import { iChat, iUser } from "types/iUser";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeUser } from "store/slices/chatSlice";
import {
  faMagnifyingGlass,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  useGetUsersPreviewQuery,
  useLazySearchUserQuery,
  useSetUsersPreviewMutation,
} from "store/API/chatApi";

function ChatSideBar() {
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const currentUser = useAppSelector((state) => state.user);
  const [userName, setUserName] = useState<string>("");

  const { data: usersPreview } = useGetUsersPreviewQuery("");

  const [getSearchUsers, searchResults] = useLazySearchUserQuery();
  const handleKey = () => {
    getSearchUsers(userName);
  };

  const [setUsersPreview] = useSetUsersPreviewMutation();
  const handleChatSelectFirst = (user: iUser) => {
    dispatch(
      changeUser({
        avatar: user.avatar ?? "",
        name: user.name,
        id: user._id ?? "",
        chatId: currentUser.id + user._id,
      })
    );
    setUsersPreview({
      senderId: currentUser.id,
      recipientId: user._id,
    });
    setUserName("");
    getSearchUsers("");
  };

  const handleChatSelect = (chat: iChat) => {
    dispatch(
      changeUser({
        avatar: chat.avatar ?? "",
        name: chat.name,
        id: chat.recipientId ?? "",
        chatId: currentUser.id + chat.recipientId,
      })
    );
  };

  console.log(searchResults.data?.length);
  

  return (
    <div className={s.sidebar}>
      <ChatNavBar />

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Find a user"
          value={userName}
          onKeyUp={handleKey}
          onChange={(e) => {
            setUserName(e.target.value.toLowerCase());
          }}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </form>

      <div className={s.users}>
        {selectedChat !== null &&
          !userName.length &&
          !usersPreview?.length && (
            <div className={s.userProfile}>
              <FontAwesomeIcon icon={faUserCircle} />
              <div className={s.userText}>
                <h3>User</h3>
                <p>Find user and select chat</p>
              </div>
            </div>
          )}

        {searchResults.data &&
          searchResults.data.map((chat: any, index) => (
            <ChatsUser
              chat={chat}
              lastMessage={""}
              onClick={handleChatSelectFirst}
              key={index}
            />
          ))}

        {!userName.length &&
          usersPreview &&
          usersPreview.map((chat: any, index) => (
            <ChatsUser
              chat={chat}
              lastMessage={chat.lastMessage}
              onClick={handleChatSelect}
              key={index}
            />
          ))}
      </div>
    </div>
  );
}

export default ChatSideBar;
