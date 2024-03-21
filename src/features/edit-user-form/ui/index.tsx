import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import { editUser, getSingleUser } from '@/src/entities/user/api/userApi';
import { DatePicker, PhoneInput, Select, Spinner } from '@/src/shared';
import type { IReturn, IUser, IUserWithoutId } from '@/src/shared/types';
import { InputField } from '@/src/shared/ui/Input';

import {
  EditUsersSchema,
  type IEditUsersSchemaInitialType,
  type IEditUsersSchemaType,
} from '../model/EditUserForm.schema';

type IEditUserForm = {
  id: string;
  closeModal: () => void;
};

export const EditUserForm: FC<IEditUserForm> = ({ id, closeModal }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<IReturn<IUser>>({
    queryKey: ['users', { id: id }],
    queryFn: () => getSingleUser(id),
  });

  const methods = useForm<
    IEditUsersSchemaInitialType,
    unknown,
    IEditUsersSchemaType
  >({
    resolver: zodResolver(EditUsersSchema),
    values: {
      firstName: user?.result?.firstName || '',
      lastName: user?.result?.lastName || '',
      middleName: user?.result?.middleName || '',
      birth: user?.result?.birth ? new Date(user?.result?.birth) : null,
      phone: user?.result?.phone || '',
      gender: user?.result?.gender || '',
    },
  });

  const { handleSubmit, reset } = methods;

  const { mutate: editUserMutation, isPending } = useMutation({
    mutationFn: (data: IUserWithoutId) => editUser(id, data),
    onError: (e) => {
      enqueueSnackbar(e.message || 'Ошибка запроса', {
        preventDuplicate: false,
        variant: 'error',
      });
    },
    onSuccess: () => {
      //todo: try to search analog of invalidatesTags callback in tanstack query
      queryClient.invalidateQueries({ queryKey: ['users', { id: id }] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      enqueueSnackbar('Данные пользователя успешно изменены!', {
        preventDuplicate: false,
        variant: 'success',
      });
      reset();
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<IEditUsersSchemaType> = async (data) => {
    console.info('Prepared Data', data);
    editUserMutation({
      ...data,
      fullName: `${data.lastName} ${data.firstName} ${data.middleName}`,
    });
  };
  return (
    <FormProvider {...methods}>
      <form id={id} onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" gap="5" position="relative">
          <InputField
            isDisabled={isPending || isLoading}
            placeholder="Введите имя"
            label="Имя"
            name="firstName"
          />
          <InputField
            isDisabled={isPending || isLoading}
            placeholder="Введите фамилию"
            label="Фамилия"
            name="lastName"
          />
          <InputField
            isDisabled={isPending || isLoading}
            placeholder="Введите отчество"
            label="Отчество"
            name="middleName"
          />
          <DatePicker
            disabled={isPending || isLoading}
            name="birth"
            label="Дата рождения"
            placeholderText="Введите дату рождения"
          />
          <PhoneInput
            isDisabled={isPending || isLoading}
            label="Номер телефона"
            name="phone"
          />
          <Select
            isDisabled={isPending || isLoading}
            name="gender"
            label="Пол"
            placeholder="Выберите пол"
          >
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </Select>
          {(isPending || isLoading) && <Spinner />}
        </Flex>
      </form>
    </FormProvider>
  );
};
