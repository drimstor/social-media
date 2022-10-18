import React from "react";
import s from "./Chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolTip from "../Helpers/ToolTip";
import { useAppSelector } from "hooks/redux";
import { v4 as uuid } from "uuid";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  faFile,
  faFileImage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  arrayUnion,
  doc,
  getFirestore,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export default function ChatInput() {
  const [text, setText] = React.useState<string>("");
  const [img, setImg] = React.useState<any>(null);
  const db = getFirestore();
  const currentUser = useAppSelector((state) => state.user);
  const anotherUser = useAppSelector((state) => state.chat);
  const storage = getStorage();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<number | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (img !== null) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          setLoading(0);

          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;
          }
          setLoading(Math.round(progress));
        },
        (error) => {
          setErrorMessage("Something went wrong");
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", anotherUser.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.id,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", anotherUser.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.id,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.id), {
      [anotherUser.chatId + ".lastMessage"]: {
        text,
      },
      [anotherUser.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", anotherUser.user.id), {
      [anotherUser.chatId + ".lastMessage"]: {
        text,
      },
      [anotherUser.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className={s.MainInput}>
      <form>
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <input
          type="file"
          id="file2"
          // onChange={(e) => setFile(e.target.files[0])}
        />

        <label htmlFor="file2">
          <ToolTip title={"Add file"} reverse>
            <FontAwesomeIcon icon={faFile} />
          </ToolTip>
        </label>

        <input
          type="file"
          id="photo"
          onChange={(e) => {
            // @ts-ignore
            setImg(e.target.files[0]);
          }}
        />
        <label htmlFor="photo">
          <ToolTip title={"Add photo"} reverse>
            <FontAwesomeIcon icon={faFileImage} />
          </ToolTip>
        </label>

        <button onClick={handleSend}>
          <span>Send</span> <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}
