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

export type ITask = {
  _id: string;
  name: string;
  date_start: string;
  date_end: string;
  user: IUser;
};

export type ITaskWithoutId = Omit<ITask, '_id'>;
export type IAddTaskQuery = Omit<ITask, '_id' | 'user'> & {
  user: string;
};

export type IIconProps = {
  width?: string;
  height?: string;
};

export type ILogin = {
  email: string;
  password: string;
};

export type IRegistration = {
  email: string;
  password: string;
  username: string;
};

export type IAuthProfile = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export type IJWTBody = IAuthProfile & { iat: number; exp: number };

export type IBreakPoints = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
