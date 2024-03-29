'use client';
import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import { editTask, getSingleTask } from '@/src/entities/task';
import { getUsers } from '@/src/entities/user';
import { DatePicker, Select, Spinner } from '@/src/shared';
import type { IAddTaskQuery, IReturn, ITask, IUser } from '@/src/shared/types';
import { InputField } from '@/src/shared/ui/Input';
import { getChangedFormFields } from '@/src/shared/utils/getChangedFormFields';

import {
  EditTaskSchema,
  type IEditTaskSchemaInitialType,
  type IEditTaskSchemaType,
} from '../model/EditTaskForm.schema';

type IEditTaskForm = {
  id: string;
  closeModal: () => void;
};

export const EditTaskForm: FC<IEditTaskForm> = ({ id, closeModal }) => {
  const queryClient = useQueryClient();

  const { data: task, isLoading } = useQuery<IReturn<ITask>>({
    queryKey: ['tasks', { id: id }],
    queryFn: () => getSingleTask(id),
  });

  const { data: users, isLoading: isUsersLoading } = useQuery<IReturn<IUser[]>>(
    {
      queryKey: ['users'],
      queryFn: getUsers,
    }
  );


  const methods = useForm<
    IEditTaskSchemaInitialType,
    unknown,
    IEditTaskSchemaType
  >({
    resolver: zodResolver(EditTaskSchema),
    values: {
      name: task?.result?.name || '',
      date_start: task?.result?.date_start ? new Date(task.result.date_start) :  null,
      date_end: task?.result?.date_end ? new Date(task.result.date_end) :  null,
      user: task?.result?.user._id || '',
    },
    shouldFocusError: false,
  });

  const {
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = methods;

  const { mutate: editTaskMutation, isPending } = useMutation({
    mutationFn: (data: Partial<IAddTaskQuery>) => editTask(id, data),
    onError: (e) => {
      enqueueSnackbar(e.message || 'Ошибка запроса', {
        preventDuplicate: false,
        variant: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', { id: id }] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      enqueueSnackbar('Данные задачи успешно изменены!', {
        preventDuplicate: false,
        variant: 'success',
      });
      reset();
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<IEditTaskSchemaType> = async (data) => {
    const preparedData = getChangedFormFields(data, dirtyFields);
    console.info(preparedData);

    editTaskMutation(preparedData);
  };
  return (
    <FormProvider {...methods}>
      <form id={id} onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" gap="5" position="relative">
          <InputField
            isDisabled={isPending || isLoading || isUsersLoading}
            placeholder="Введите название задачи"
            label="Название задачи"
            name="name"
          />
          <DatePicker
            disabled={isPending || isLoading || isUsersLoading}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy h:mm aa"
            name="date_start"
            label="Дата начала"
            placeholderText="Введите дату начала"
          />
          <DatePicker
            disabled={isPending || isLoading || isUsersLoading}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy h:mm aa"
            name="date_end"
            label="Дата окончания"
            placeholderText="Введите дату окончания"
          />
          <Select
            isDisabled={isPending || isLoading || isUsersLoading}
            name="user"
            label="Ответственный"
            placeholder="Выберите ответственного"
          >
            {users?.result?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.fullName}
              </option>
            ))}
          </Select>
          {(isPending || isLoading || isUsersLoading) && <Spinner />}
        </Flex>
      </form>
    </FormProvider>
  );
};
