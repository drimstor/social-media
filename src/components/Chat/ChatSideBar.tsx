import React from "react";
import s from "./Chat.module.scss";
import ChatNavBar from "./ChatNavBar";
import ChatsUser from "./ChatsUser";
import useMediaQuery from "hooks/useMediaQuery";
import { iUsers, iUserState } from "types/iUsers";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { changeUser } from "store/slices/chatSlice";

interface ChatSideBarProps {
  users: iUsers[];
  setSelectChat: (index: number) => void;
  selectChat: number;
}

function ChatSideBar({ users, setSelectChat, selectChat }: ChatSideBarProps) {
  const matches = useMediaQuery("(max-width: 425px)");
  const db = getFirestore();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user);
  const [error, setError] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [user, setUser] = React.useState<iUserState | DocumentData | null>(
    null
  );
  const chatInfo = useAppSelector((state) => state.chat);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleKey = (e: any) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    if (user) {
      const combinedId =
        currentUser.id > user.id
          ? currentUser.id + user.id
          : user.id + currentUser.id;
      try {
        const res = await getDoc(doc(db, "chats", combinedId));
        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
          //create user chats
          await updateDoc(doc(db, "userChats", currentUser.id), {
            [combinedId + ".userInfo"]: {
              id: user.id,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          //create user chats
          await updateDoc(doc(db, "userChats", user.id), {
            [combinedId + ".userInfo"]: {
              id: currentUser.id,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {
        setError(true);
      }
      setUser(null);
      setUserName("");
    }
  };

  const handleChatSelect = (user: any) => {
    const chatObj = [currentUser, user];
    dispatch(changeUser(chatObj));
  };

  //<DocumentData | null | undefined>
  const [chats, setChats] = React.useState<any>(null);

  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.id), (doc) => {
      setChats(doc.data());
    });
    return () => {
      unsub();
    };
  }, [currentUser.id, db]);

  // console.log(Object.entries(chats));

  return (
    <div className={s.sidebar}>
      <ChatNavBar />
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Find a user"
          value={userName}
          onKeyDown={handleKey}
          onChange={(e) => {
            setUserName(e.target.value.toLowerCase());
          }}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </form>
      <div className={s.users}>
        {user !== null && (
          <div className={s.userProfile} onClick={handleSelect}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile avatar" />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} />
            )}
            <div className={s.userText}>
              <h3>{user.displayName}</h3>
            </div>
          </div>
        )}

        {error && <p>Error</p>}

        {chats &&
          Object.entries(chats)?.map((chat: any) => (
            <div
              // style={{
              //   background:
              //     selectChat === index && !matches ? "rgba(0, 0, 0, 0.22)" : "",
              // }}
              key={chat[0]}
              // onClick={() => setSelectChat(index)}
            >
              <ChatsUser chat={chat} onClick={handleChatSelect} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChatSideBar;
