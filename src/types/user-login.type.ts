export interface userLogin {
  username: string;
  password: string;
}

export interface userModel extends userLogin {
  id: string;
  balance: string;
}
