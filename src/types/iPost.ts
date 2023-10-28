export interface iPost {
  _id: string;
  user: string;
  nickname: string;
  name: string;
  avatar: string;
  date: number;
  text: string;
  image?: string;
  liked: string[];
}

export interface iAddPost {
  [key: string]: string;
}

export interface iComment {
  _id: string;
  user: string;
  postId: number;
  name: string;
  avatar: string;
  date: number;
  text: string;
  image?: string;
  liked: string[];
}
