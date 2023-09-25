// import React from "react";
// import s from "./Chat.module.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ToolTip from "../Helpers/ToolTip";
// import { useAppSelector } from "hooks/redux";
// import { v4 as uuid } from "uuid";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import {
//   faFileArrowUp,
//   faFileImage,
//   faPaperPlane,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   arrayUnion,
//   doc,
//   getFirestore,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";

// export default function ChatInput() {
//   const [text, setText] = React.useState<string>("");
//   const [img, setImg] = React.useState<any>(null);
//   const [errorMessage, setErrorMessage] = React.useState<string>("");
//   const [loading, setLoading] = React.useState<number | null>(null);
//   const currentUser = useAppSelector((state) => state.user);
//   const anotherUser = useAppSelector((state) => state.chat);
//   const storage = getStorage();
//   const db = getFirestore();

//   const handleSend = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (img !== null) {
//       const storageRef = ref(storage, uuid());
//       const uploadTask = uploadBytesResumable(storageRef, img);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           // console.log("Upload is " + progress + "% done");
//           setLoading(1);

//           switch (snapshot.state) {
//             case "paused":
//               // console.log("Upload is paused");
//               break;
//             case "running":
//               // console.log("Upload is running");
//               break;
//           }
//           setLoading(Math.round(progress));
//         },
//         (error) => {
//           setErrorMessage("Something went wrong");
//         },
//         () => {
//           // Handle successful uploads on complete
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             await updateDoc(doc(db, "chats", anotherUser.chatId), {
//               messages: arrayUnion({
//                 id: uuid(),
//                 text,
//                 senderId: currentUser.id,
//                 date: Timestamp.now(),
//                 img: downloadURL,
//               }),
//             });
//             setText("");
//             setImg(null);
//             setLoading(null);
//           });
//         }
//       );
//     } else {
//       await updateDoc(doc(db, "chats", anotherUser.chatId), {
//         messages: arrayUnion({
//           id: uuid(),
//           text,
//           senderId: currentUser.id,
//           date: Timestamp.now(),
//         }),
//       });
//     }

//     await updateDoc(doc(db, "userChats", currentUser.id), {
//       [anotherUser.chatId + ".lastMessage"]: {
//         text,
//       },
//       [anotherUser.chatId + ".date"]: serverTimestamp(),
//     });

//     await updateDoc(doc(db, "userChats", anotherUser.user.id), {
//       [anotherUser.chatId + ".lastMessage"]: {
//         text,
//       },
//       [anotherUser.chatId + ".date"]: serverTimestamp(),
//     });

//     setText("");
//     setImg(null);
//   };

//   return (
//     <div className={s.MainInput}>
//       <form>
//         <textarea
//           placeholder="Type something..."
//           onChange={(e) => setText(e.target.value)}
//           value={text}
//         />

//         <input
//           type="file"
//           id="photo"
//           onChange={(e) => {
//             // @ts-ignore
//             setImg(e.target.files[0]);
//           }}
//         />

//         <label htmlFor="photo">
//           <ToolTip title={"Photo"} reverse>
//             {img ? (
//               <FontAwesomeIcon icon={faFileArrowUp} className={s.fileIcon} />
//             ) : (
//               <FontAwesomeIcon icon={faFileImage} />
//             )}
//           </ToolTip>
//         </label>

//         {img && (
//           <div className={s.progressLoading}>
//             <div
//               style={{ width: `${loading}%` }}
//               className={s.progressLoadingBar}
//             />
//             {errorMessage && <span>Error</span>}
//           </div>
//         )}

//         <button onClick={handleSend}>
//           <span>Send</span> <FontAwesomeIcon icon={faPaperPlane} />
//         </button>
//       </form>
//     </div>
//   );
// }


import React from 'react'

const ChatInput = () => {
  return (
    <div>ChatInput</div>
  )
}

export default ChatInput