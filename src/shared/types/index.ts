export type ITableItem = {
  title: string;
  id: string;
};

export type IReturn<T> = {
  result: T | null;
  error: string | null;
};

export type IUser = {
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  birth: string;
  phone: string;
  gender: string;
};
