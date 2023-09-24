// import React from "react";
// import s from "./Chat.module.scss";
// import ChatNavBar from "./ChatNavBar";
// import ChatsUser from "./ChatsUser";
// import { iUserState } from "types/iUser";
// import { useAppDispatch, useAppSelector } from "hooks/redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { changeUser } from "store/slices/chatSlice";
// import {
//   faMagnifyingGlass,
//   faUserCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   collection,
//   query,
//   where,
//   getFirestore,
//   getDocs,
//   doc,
//   getDoc,
//   setDoc,
//   serverTimestamp,
//   updateDoc,
//   DocumentData,
//   onSnapshot,
// } from "firebase/firestore";
// import { API_URL } from "config";

// interface iChatUser {
//   0: string;
//   1: { date: string; userInfo: iUserState; lastMessage?: { text: string } };
// }

// function ChatSideBar() {
//   const db = getFirestore();
//   const dispatch = useAppDispatch();
//   const currentUser = useAppSelector((state) => state.user);
//   const [error, setError] = React.useState<boolean>(false);
//   const [userName, setUserName] = React.useState<string>("");
//   const [user, setUser] = React.useState<iUserState | DocumentData | null>(
//     null
//   );
//   const [chats, setChats] = React.useState<DocumentData | null | undefined>(
//     null
//   );

//   React.useEffect(() => {
//     const unsub = onSnapshot(doc(db, "userChats", currentUser.id), (doc) => {
//       setChats(doc.data());
//     });
//     return () => {
//       unsub();
//     };
//   }, [currentUser.id, db]);

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, "users"),
//       where("displayName", "==", userName)
//     );
//     try {
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         setUser(doc.data());
//       });
//     } catch (error) {
//       setError(true);
//     }
//   };

//   const handleKey = (e: React.KeyboardEvent) => {
//     e.code === "Enter" && handleSearch();
//   };

//   const handleChatSelect = (user: iUserState) => {
//     dispatch(changeUser([currentUser, user]));
//   };

//   const handleSelect = async () => {
//     //check whether the group(chats in firestore) exists, if not create
//     if (user) {
//       const combinedId =
//         currentUser.id > user.id
//           ? currentUser.id + user.id
//           : user.id + currentUser.id;
//       try {
//         const res = await getDoc(doc(db, "chats", combinedId));
//         if (!res.exists()) {
//           //create a chat in chats collection
//           await setDoc(doc(db, "chats", combinedId), { messages: [] });
//           //create user chats
//           await updateDoc(doc(db, "userChats", currentUser.id), {
//             [combinedId + ".userInfo"]: {
//               id: user.id,
//               displayName: user.displayName,
//               photoURL: user.photoURL,
//             },
//             [combinedId + ".date"]: serverTimestamp(),
//           });
//           //create user chats
//           await updateDoc(doc(db, "userChats", user.id), {
//             [combinedId + ".userInfo"]: {
//               id: currentUser.id,
//               displayName: currentUser.displayName,
//               photoURL: currentUser.photoURL,
//             },
//             [combinedId + ".date"]: serverTimestamp(),
//           });
//         }
//       } catch (err) {
//         setError(true);
//       }
//       setUser(null);
//       setUserName("");
//     }
//   };

//   return (
//     <div className={s.sidebar}>
//       <ChatNavBar />

//       <form onSubmit={(e) => e.preventDefault()}>
//         <input
//           type="text"
//           placeholder="Find a user"
//           value={userName}
//           onKeyDown={handleKey}
//           onChange={(e) => {
//             setUserName(e.target.value.toLowerCase());
//           }}
//         />
//         <FontAwesomeIcon icon={faMagnifyingGlass} />
//       </form>

//       <div className={s.users}>
//         {user !== null && (
//           <div className={s.userProfile} onClick={handleSelect}>
//             {user.photoURL ? (
//               <img src={API_URL + user.photoURL} alt="Profile avatar" />
//             ) : (
//               <FontAwesomeIcon icon={faUserCircle} />
//             )}
//             <div className={s.userText}>
//               <h3>{user.displayName}</h3>
//             </div>
//           </div>
//         )}

//         {error && <p className={s.error}>Something is wrong</p>}

//         {chats &&
//           Object.entries(chats)
//             ?.sort((a, b) => b[1].date - a[1].date)
//             .map((chatUser: iChatUser, index) => (
//               <ChatsUser
//                 chatUser={chatUser[1].userInfo}
//                 lastMessage={chatUser[1].lastMessage}
//                 onClick={handleChatSelect}
//                 key={index}
//               />
//             ))}
//       </div>
//     </div>
//   );
// }

// export default ChatSideBar;


import React from 'react'

const ChatSideBar = () => {
  return (
    <div>ChatSideBar</div>
  )
}

export default ChatSideBar