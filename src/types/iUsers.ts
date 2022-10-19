export interface iUserState {
  photoURL?: string | null;
  displayName: string;
  email?: string;
  id: string;
}

export interface iFakeUser {
  id: number;
  name: string;
  username: string;
  email: string;
}
