import { baseApi } from '@/src/shared';

export const getUsers = async () => {
  const res = await baseApi.get('/users');
  return res.data;
};
