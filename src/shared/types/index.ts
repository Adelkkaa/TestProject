export type IReturn<T> = {
  result: T | null;
  error: string | null;
};

export type IUser = {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  birth: string;
  phone: string;
  gender: string;
};

export type IUserWithoutId = Omit<IUser, '_id'>;

export type IIconProps = {
  width?: string,
  height?: string
}
