import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDc1-VQVZj5HrhSpZTR3N1X3BUcsXpDPlk",
  authDomain: "web-chat-5bf34.firebaseapp.com",
  databaseURL: "https://web-chat-5bf34-default-rtdb.firebaseio.com",
  projectId: "web-chat-5bf34",
  storageBucket: "web-chat-5bf34.appspot.com",
  messagingSenderId: "900799522357",
  appId: "1:900799522357:web:7176e507ecb1db7eeb337c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
