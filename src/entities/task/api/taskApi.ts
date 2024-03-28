import { baseApi } from '@/src/shared';
import type { IAddTaskQuery } from '@/src/shared/types';

export const getTasks = async () => {
  const res = await baseApi.get('/tasks');
  return res.data;
};

export const getSingleTask = async (id: string) => {
  const res = await baseApi.get(`/tasks/${id}`);

  return res.data;
};

export const addNewTask = async (data: IAddTaskQuery) => {
  const res = await baseApi.post('/tasks', data, {
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  });

  return res.data;
};

export const editTask = async (id: string, data: Partial<IAddTaskQuery>) => {
  const res = await baseApi.patch(`/tasks/${id}`, data, {
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  });

  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await baseApi.delete(`/tasks/${id}`);

  return res.data;
};
