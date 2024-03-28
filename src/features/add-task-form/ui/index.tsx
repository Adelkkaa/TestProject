'use client';
import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useEffect, type FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { addNewTask } from '@/src/entities/task';
import { getUsers } from '@/src/entities/user';
import { DatePicker, Select, Spinner } from '@/src/shared';
import type { IAddTaskQuery, IReturn, IUser } from '@/src/shared/types';
import { InputField } from '@/src/shared/ui/Input';

import {
  AddTaskSchema,
  type IAddTaskSchemaInitialType,
  type IAddTaskSchemaType,
} from '../model/AddTaskForm.schema';
import { defaultValues } from '../model/defaultValues';

type IAddTaskFormProps = {
  formId: string;
  closeModal: () => void;
};

export const AddTaskForm: FC<IAddTaskFormProps> = ({ formId, closeModal }) => {
  const queryClient = useQueryClient();

  const methods = useForm<
    IAddTaskSchemaInitialType,
    unknown,
    IAddTaskSchemaType
  >({
    mode: 'onSubmit',
    resolver: zodResolver(AddTaskSchema),
    defaultValues,
    shouldFocusError: false,
  });


  const { handleSubmit, reset, control, trigger, clearErrors, formState: {isSubmitted} } = methods;

  const {date_end, date_start} = useWatch({control})


  const { mutate: addTask, isPending } = useMutation({
    mutationFn: (data: IAddTaskQuery) => addNewTask(data),
    onError: (e) => {
      enqueueSnackbar(e.message || 'Ошибка запроса', {
        preventDuplicate: false,
        variant: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      enqueueSnackbar('Задача успешно создана!', {
        preventDuplicate: false,
        variant: 'success',
      });
      reset();
      closeModal();
    },
  });

  const { data: users, isLoading } = useQuery<IReturn<IUser[]>>({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const onSubmit: SubmitHandler<IAddTaskSchemaType> = async (data) => {
    console.info('Prepared Data', data);
    addTask(data);
  };

  useEffect(() => {
    if (isSubmitted) {
      if (dayjs(date_end) > dayjs(date_start)) {
        clearErrors('date_end')
      } else {
        trigger('date_end')
      }
    }
  }, [date_start, date_end, clearErrors, trigger, isSubmitted])
  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" gap="5" position="relative">
          <InputField
            isDisabled={isPending || isLoading}
            placeholder="Введите название задачи"
            label="Название задачи"
            name="name"
          />
          <DatePicker
            disabled={isPending || isLoading}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy h:mm aa"
            name="date_start"
            label="Дата начала"
            placeholderText="Введите дату начала"
          />
          <DatePicker
            disabled={isPending || isLoading}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy h:mm aa"
            name="date_end"
            label="Дата окончания"
            placeholderText="Введите дату окончания"
          />
          <Select
            isDisabled={isPending || isLoading}
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
          {isPending || (isLoading && <Spinner />)}
        </Flex>
      </form>
    </FormProvider>
  );
};
