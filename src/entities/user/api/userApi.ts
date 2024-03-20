import { baseApi } from '@/src/shared';
import type { IUserWithoutId } from '@/src/shared/types';

export const getUsers = async () => {
  const res = await baseApi.get('/users');
  return res.data;
};

export const addNewUser = async (data: IUserWithoutId) => {
  const res = await baseApi.post('/users', data, {
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  });

  return res.data;
};
