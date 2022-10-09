import React from "react";
import s from "./Chat.module.scss";
import ChatNavBar from "./ChatNavBar";
import ChatsUser from "./ChatsUser";
import { iUsers, iUsersDb } from "types/iUsers";
import useMediaQuery from "hooks/useMediaQuery";
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
} from "firebase/firestore";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

interface ChatSideBarProps {
  users: iUsers[];
  setSelectChat: (index: number) => void;
  selectChat: number;
}

function ChatSideBar({ users, setSelectChat, selectChat }: ChatSideBarProps) {
  const matches = useMediaQuery("(max-width: 425px)");
  const db = getFirestore();

  const [userName, setUserName] = React.useState("");
  const [user, setUser] = React.useState<any>(null);
  const [error, setError] = React.useState(false);

  const currentUser = useSelector((state: any) => state.user);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  };

  const handleKey = (e: any) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUserName("");
  };

  return (
    <div className={s.sidebar}>
      <ChatNavBar />
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Find a user"
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

        {users.map((user, index) => (
          <div
            style={{
              background:
                selectChat === index && !matches ? "rgba(0, 0, 0, 0.22)" : "",
            }}
            key={index}
            onClick={() => setSelectChat(index)}
          >
            <ChatsUser key={index} user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatSideBar;
