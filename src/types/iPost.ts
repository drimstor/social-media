import { Timestamp } from "firebase/firestore";

export interface iPost {
  id: number;
  userId: string;
  nickname: string;
  displayName: string;
  photoURL: string;
  date: Timestamp;
  text: string;
  images?: string[];
  likes: number;
  liked: string[];
}

export interface iComment {
  id: number;
  userId: string;
  postId: number;
  displayName: string;
  photoURL: string;
  date: Timestamp;
  text: string;
  images?: string[];
  likes: number;
  liked: string[];
}
