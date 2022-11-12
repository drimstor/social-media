export interface iPost {
  id: number;
  userId: string;
  nickname: string;
  displayName: string;
  photoURL: string;
  date: {
    nanoseconds: number;
    seconds: number;
  };
  text?: string;
  images?: string[];
  likes?: number;
  comments?: number;
}

export interface iComment {
  id: number;
  userId: string;
  postId: number;
  displayName: string;
  photoURL: string;
  date: {
    nanoseconds: number;
    seconds: number;
  };
  text?: string;
  images?: string[];
}
