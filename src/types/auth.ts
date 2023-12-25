export type IUser = {
  first_name: string;
  last_name: string;
  nickname: string;
  email: string;
  hash: string;
  registered_at: string;
};

export type IUserPayload = Omit<IUser, "hash"> & { password: string };
