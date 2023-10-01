export interface iUserState {
  avatar?: string | null;
  name: string;
  email?: string;
  id: string;
  token: string;
  posts?: number;
}

export interface iFakeUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

// export interface iUser {
//   id: string;
//   email: string;
//   diskSpace: number;
//   usedSpace: number;
//   avatar?: string;
// }

export interface iLoginUser {
  email: string;
  password: string;
  name: string;
  file: any;
}
