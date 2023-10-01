export interface iPost {
  _id: number;
  userId: string;
  nickname: string;
  name: string;
  avatar: string;
  date: {
    nanoseconds: number;
    seconds: number;
  };
  text: string;
  images?: string[];
  likes: number;
  liked: string[];
}

export interface iAddPost {
  [key: string]: string;
}

export interface iComment {
  id: number;
  userId: string;
  postId: number;
  name: string;
  avatar: string;
  date: {
    nanoseconds: number;
    seconds: number;
  };
  text: string;
  images?: string[];
  likes: number;
  liked: string[];
}
