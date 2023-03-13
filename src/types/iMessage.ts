import { Timestamp } from "firebase/firestore";

export interface iMessage {
  id: string;
  senderId: string;
  text: string;
  img?: string;
  date: Timestamp;
}
