export interface iUserState {
  avatar?: string | null;
  name: string;
  email?: string;
  _id?: string;
  id: string;
  token: string;
  posts?: number;
  anotherUserProfile?: {
    avatar?: string | null;
    name: string;
    id: "";
  } | null;
}

export interface iChat {
  avatar?: string;
  name: string;
  id: string;
  recipientId?: string;
  _id?: string;
  lastMessage?: string;
}

export interface iChangeChatPayload {
  avatar: string;
  name: string;
  id: string;
  chatId: string;
}

export interface iUser {
  email?: string;
  diskSpace?: number;
  usedSpace?: number;
  avatar?: string;
  name: string;
  _id?: string;
  id?: string;
  posts?: number;
}

export interface iLoginUser {
  email: string;
  password: string;
  name: string;
  file: any;
}
