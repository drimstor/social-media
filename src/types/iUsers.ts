export interface iUsers {
  avatar?: string;
  name: string;
  message: string;
}

export interface iUsersDb {
  photoURL?: string;
  displayName: string;
  message?: string;
  id: string;
}

export interface iUserState {
  photoURL: string | null;
  displayName: string;
  email: string;
  id: string;
}

export interface iFakeUser {
  id: number;
  name: string;
  username: string;
  email: string;
}
