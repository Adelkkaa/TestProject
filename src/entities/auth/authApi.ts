import { baseApi } from '@/src/shared';
import type { IAuthProfile, ILogin } from '@/src/shared/types';

export const login = async (data: ILogin) => {
  const res = await baseApi.post('/auth/login', data, {
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  });

  return res.data;
};

export const signOut = async (data: IAuthProfile) => {
  const res = await baseApi.post('/auth/signOut', data, {
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  });

  return res.data;
};
