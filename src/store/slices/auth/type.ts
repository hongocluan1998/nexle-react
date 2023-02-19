export interface InitialState {
  userInfo?: ProfileUser;
}

export interface ProfileUser {
  _id: string;
  email: string;
  admin: boolean;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  displayName: string;
  token: string;
  refreshToken: string;
}
